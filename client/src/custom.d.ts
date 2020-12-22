declare module '*.scss' {
    const scss: {[key: string]: string};
    export default scss;
}

declare module '*.svg' {
    const ReactComponent: React.ComponentType<ReactSVGAttributes<SVGElement>>;
    export default ReactComponent;
}