import replace from "@rollup/plugin-replace";
import resolve from "@rollup/plugin-node-resolve";
import size from "rollup-plugin-bundle-size";
import terser from "@rollup/plugin-terser";
import typescript from '@rollup/plugin-typescript';

const production = process.env.NODE_ENV === "production";

const terserOptions = {
    output: {
        comments: false
    },
    compress: {
        passes: 5,
        ecma: 2020,
        drop_console: false,
        drop_debugger: true,
        pure_getters: true,
        arguments: true,
        unsafe_comps: true,
        unsafe_math: true,
        unsafe_methods: true
    }
};

const plugins = [
    resolve(),
    typescript(),
    size(),
    replace({
        "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
        "__DEV": !production,
        preventAssignment: true
    })
];

export default [{
    input: "src/hotkey.ts",
    output: [{
        file: "dist/hotkey.esm.js",
        format: "esm"
    },{
        file: "dist/hotkey.esm.min.js",
        format: "esm",
        plugins: [terser(terserOptions)]
    }, {
        name: "window",
        file: "dist/hotkey.js",
        format: "iife",
        extend: true
    }, {
        name: "window",
        file: "dist/hotkey.min.js",
        format: "iife",
        extend: true,
        plugins: [terser(terserOptions)]
    }],
    plugins
}]
