/***
 * This is a pretty old file that I've been refining over time. That being said it has a few problems that I would address if refactored:
 *  - It mounts the script in the old school JS way. Ideally this would use a modern solution like nuxt/scripts
 *  - It does the rookie JS error of redeclaring and repeating things like document.querySelector
 *  - The custom dropdown and it's items use inline styles. Mainly because I never needed to edit them but ideally they would just mount the class
 *    and then get the styles from the css file. This should be trivial but I haven't tested it.
 *  - It's in JS instead of TS. Theres a lot of BS custom event handling, a custom oberver, and some custom window objects which would make typing this
 *    a huge pain in the ass, but it would be safer and easier to adapt in the future if needed.
 *  - This is based on the google docs from circa 2020 so there's surely depreciated APIs and things in here. There is probably a much better solution
 *    that doesn't rely on the window object.
 *  - This plugin is mounted even if you never use the address components that need it. It's not super heavy when mounting, it's really just a script
 *    but maybe it should be a util at the component level? But that means it would re-mount every time the component mounts which is probably less
 *    efficient overall. Again theres probably a solution with nuxt/scripts that solves this.
 */

export default defineNuxtPlugin({
  name: 'maps',
  setup: () => {
    const runtime = useRuntimeConfig();
    const apiKey = runtime.public.dannyui.google.mapsApiKey;
    if (!apiKey) {
      console.warn(
        `Unable to find google maps api key. This key is not required but without it inputs that require address auto-complete will not work.`
      );
      return;
    }
    let loaded = false;
    let waiting = [];

    function init() {
      loaded = true;
      waiting.forEach((item) => {
        if (typeof item.fn === 'function') {
          item.fn(...item.arguments);
        }
      });
    }

    // TODO migrate this to use NuxtScripts. It's safer.
    function addScript() {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&loading=async&libraries=places&callback=initGoogleMaps`;
      script.async = true;
      document.head.appendChild(script);
    }

    function makeAutoComplete(input, types, disableDefaultDropdown = false) {
      if (!loaded) {
        waiting.push({
          fn: makeAutoComplete,
          // eslint-disable-next-line prefer-rest-params
          arguments
        });
      }

      if (!import.meta.dev) {
        console.warn = () => { }; // This is gross, but google throws depreciation warnings in production environments.
      }

      const options = {
        types
      };

      if (disableDefaultDropdown) {
        options.types = [];
      }

      const autoComplete = new window.google.maps.places.AutoComplete(input, options.types);

      autoComplete.addListener('place_changed', () => {
        const place = autoComplete.getPlace();
        input.dispatchEvent(new CustomEvent('changed', { detail: place }));
      });

      function hideDefaultDropdown() {
        const defaultDropdown = document.querySelectorAll('.pac-container');
        if (defaultDropdown) {
          defaultDropdown.forEach((dropdown) => {
            dropdown.remove();
          });
        }
      }

      function createCustomDropdown() {
        const existingDropdown = document.querySelector('.custom-address-dropdown');
        if (existingDropdown) {
          existingDropdown.remove();
        }

        const customDropdown = document.createElement('div');
        customDropdown.className = 'custom-address-dropdown';
        // TODO this is pretty gross. I should probably just keep the class and migrate these styles to the css file so they can be updated more easily
        customDropdown.style.cssText = `
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: white;
            border: 2px solid #e2e8f0;
            border-radius: 8px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            max-height: 300px;
            overflow-y: auto;
            z-index: 1000;
            display: none;
        `;

        // Input comes from the makeAutoComplete params, just a note because I read this and incorrectly think i've swapped from customDropdown to generic input
        input.parentElement.style.position = 'relative';
        input.parentElement.appendChild(customDropdown);

        return customDropdown;
      }

      function populateCustomDropdown(predictions) {
        const customDropdown = document.querySelector('.custom-address-dropdown') || createCustomDropdown();
        customDropdown.innerHTML = '';

        if (predictions && predictions.length > 0) {
          predictions.forEach((prediction) => {
            const item = document.createElement('div');
            item.className = 'custom-address-item';
            // TODO as above, probably migrate these to the css file when you have time
            item.style.cssText = `
                            padding: 12px 16px;
                            border-bottom: 1px solid #f1f5f9;
                            cursor: pointer;
                            font-size: 14px;
                            color: #374151;
                        `;
            item.textContent = prediction.description;

            item.addEventListener('click', () => {
              input.value = prediction.description;
              customDropdown.style.display = 'none';
              input.dispatchEvent(new CustomEvent('changed', { detail: prediction }));
            });

            item.addEventListener('mouseenter', () => {
              item.style.backgroundColor = '#F8FAFC';
            });
            item.addEventListener('mouseleave', () => {
              item.style.backgroundColor = '';
            });

            customDropdown.appendChild(item);
          });

          const item = document.createElement('div');
          item.className = 'custom-address-manual-switch';
          // TODO as above
          item.style.cssText = `
                padding: 12px 16px;
                border-bottom: none;
                cursor: pointer;
                display: flex;
                flex-flow: row nowrap;
                align-items: center;
                justify-content: space-between;
            `;

          const label = document.createElement('p');
          label.style.cssText = `
                        font-size: 12px;
                        text-decoration: underline;
                        color: #374151;`;
          label.textContent = 'Enter an address manually';
          item.appendChild(label);

          // I have not checked the clearance of this attribution in quite a while so use at your own risk
          const attribution = document.createElement('p');
          attribution.style.cssText = `
                        font-family: Roboto, Sans-Serif;
                        font-style: normal;
                        font-weight: 400;
                        font-size: 12px;
                        letter-spacing: normal;
                        white-space: nowrap;
                        color: #5e5e5e;`;
          attribution.textContent = 'Powered by Google';
          item.appendChild(attribution);

          item.addEventListener('click', () => {
            customDropdown.style.display = 'none';
            input.dispatchEvent(new CustomEvent('manual-switch'));
          });

          item.addEventListener('mouseenter', () => {
            item.style.backgroundColor = '#f8fafc';
          });

          item.addEventListener('mouseleave', () => {
            item.style.backgroundColor = '';
          });

          customDropdown.appendChild(item);
          customDropdown.style.display = 'block';
        }
        else {
          customDropdown.style.display = 'none';
        }
      };

      function styleDropdown(styles) {
        const dropdown = document.querySelector('.custom-address-dropdown');
        if (dropdown) {
          Object.assign(dropdown.style, styles);
        }
      }

      function styleDropdownItems(styles) {
        const dropdown = document.querySelector('.custom-address-dropdown');
        if (dropdown) {
          const items = dropdown.querySelectorAll('.custom-address-item');
          items.forEach((item) => {
            Object.assign(item.style, styles);
          });
        }
      }

      function addDropdownClasses(classes) {
        const dropdown = document.querySelector('.custom-address-dropdown');
        if (dropdown) {
          dropdown.classList.add(...classes);
        }
      }

      function addDropdownItemClasses(classes) {
        const dropdown = document.querySelector('.custom-address-dropdown');
        if (dropdown) {
          const items = dropdown.querySelectorAll('.custom-address-item');
          items.forEach((item) => {
            item.classList.add(...classes);
          });
        }
      };

      // Input listener with a debounce (300ms)
      let timeoutID;
      input.addEventListener('input', () => {
        clearTimeout(timeoutID);
        timeoutID = setTimeout(() => {
          if (input.value.length > 2) {
            const service = new window.google.maps.places.AutoCompleteService();
            service.getPlacePredicitions({
              input: input.value,
              types,
            }, (predictions, status) => {
              if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                populateCustomDropdown(predictions);
              }
              else {
                const customDropdown = document.querySelector('.custom-address-dropdown');
                if (customDropdown) {
                  customDropdown.style.display = 'none';
                }
              }
            });
          }
          else {
            const customDropdown = document.querySelector('.custom-address-dropdown');
            if (customDropdown) {
              customDropdown.style.display = 'none';
            }
          }
        }, 300);
      });

      document.addEventListener('click', (event) => {
        if (!input.contains(event.target) && !event.target.closest('.custom-address-dropdown')) {
          const customDropdown = document.querySelector('.custom-address-dropdown');
          if (customDropdown) {
            customDropdown.style.display = 'none';
          }
        }
      });

      const observer = new MutationObserver(() => {
        hideDefaultDropdown();
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true
      });

      setTimeout(() => {
        input.dispatchEvent(new CustomEvent('dropdown-ready', {
          detail: {
            dropdown: document.querySelector('.custom-address-dropdown'),
            styleDropdown,
            styleDropdownItems,
            addDropdownClasses,
            addDropdownItemClasses
          }
        }));
      }, 100);

      return {
        styleDropdown,
        styleDropdownItems,
        addDropdownClasses,
        addDropdownItemClasses
      };
    }

    window.initGoogleMaps = init;
    addScript();
    return {
      provide: { makeAutoComplete }
    };
  }
});
