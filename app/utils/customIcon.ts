export function customIcon(icon: string, fontSize: string = '1.5em') {
    return `
        <span class="material-symbols-outlined" style="font-size:${fontSize}">
            ${icon}
        </span>
    `
}