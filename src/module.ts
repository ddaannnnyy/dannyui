import {
  defineNuxtModule,
  addPlugin,
  addComponentsDir,
  createResolver,
  installModule,
} from "@nuxt/kit";

// Module options TypeScript interface definition
export interface ModuleOptions {}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: "my-module",
    configKey: "myModule",
  },
  // Default configuration options of the Nuxt module
  defaults: {},
  async setup(_options, _nuxt) {
    const { resolve } = createResolver(import.meta.url);
    const runtimeDir = resolve("./runtime");
    _nuxt.options.build.transpile.push(runtimeDir);

    /**
     * @name Component importer
     */
    addComponentsDir({
      path: resolve("./runtime/components"),
    });

    /**
     * @name VueUse Importer
     */
    await installModule("@vueuse/nuxt");

    /**
     * Tailwind css importer
     */
    _nuxt.options.css.push(resolve("./runtime/tailwind.css"));
    console.log("installing tailwind and setting config");
    await installModule("@nuxtjs/tailwindcss", {
      exposeConfig: true,
      configPath: "",
      config: {
        darkMode: "class",
        content: {
          files: [
            resolve("../playground/app.vue"),
            resolve("./components/**/*"),
            resolve("./runtime/components/**/*"),
          ],
        },
        theme: {
          extend: {
            colors: {
              primary: "#2176FF",
              secondary: "#258ea6",
              accent: "#9b5de5",
              neutral: "#fffffa",
              base: "#0d0c1d",
              info: "#4392f1",
              success: "#0b5351",
              warning: "#ffbc0a",
              error: "#f45b69",
            },
            spacing: {
              0: "0",
              50: "5px",
              100: "10px",
              150: "15px",
              200: "20px",
              250: "25px",
              300: "30px",
              350: "35px",
              400: "40px",
              450: "45px",
              500: "50px",
              550: "55px",
              600: "60px",
              650: "65px",
              700: "70px",
              750: "75px",
              800: "80px",
              850: "85px",
              900: "90px",
              950: "95px",
              1000: "100px",
              1100: "110px",
              1200: "120px",
              1300: "130px",
              1400: "140px",
              1500: "150px",
              1600: "160px",
              1700: "170px",
              1800: "180px",
              1900: "190px",
              2000: "200px",
              2100: "210px",
              2200: "220px",
              2300: "230px",
              2400: "240px",
              2500: "250px",
              2600: "260px",
              2700: "270px",
              2800: "280px",
              2900: "290px",
              3000: "300px",
              3100: "310px",
              3200: "320px",
              3300: "330px",
              3400: "340px",
              3500: "350px",
              3600: "360px",
              3700: "370px",
              3800: "380px",
              3900: "390px",
              4000: "400px",
              4500: "450px",
              5000: "500px",
              5500: "550px",
              6000: "600px",
              6500: "650px",
              7000: "700px",
              7500: "750px",
              8000: "800px",
              8500: "850px",
              9000: "900px",
              9500: "950px",
            },
          },
        },
      },
    });
  },
});
