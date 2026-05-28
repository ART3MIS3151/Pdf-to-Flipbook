declare module 'page-flip' {
  export class PageFlip {
    constructor(element: HTMLElement, options: any);
    loadFromHTML(items: NodeListOf<Element> | HTMLElement[]): void;
    loadFromImages(images: string[]): void;
    destroy(): void;
    on(eventName: string, callback: (e: any) => void): void;
  }
}
