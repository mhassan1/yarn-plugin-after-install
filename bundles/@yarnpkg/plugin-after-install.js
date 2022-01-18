/* eslint-disable */
//prettier-ignore
module.exports = {
name: "@yarnpkg/plugin-after-install",
factory: function (require) {
var plugin=(()=>{var g=Object.create,r=Object.defineProperty;var d=Object.getOwnPropertyDescriptor;var x=Object.getOwnPropertyNames;var C=Object.getPrototypeOf,k=Object.prototype.hasOwnProperty;var y=t=>r(t,"__esModule",{value:!0});var a=t=>{if(typeof require!="undefined")return require(t);throw new Error('Dynamic require of "'+t+'" is not supported')};var I=(t,o)=>{for(var e in o)r(t,e,{get:o[e],enumerable:!0})},h=(t,o,e)=>{if(o&&typeof o=="object"||typeof o=="function")for(let n of x(o))!k.call(t,n)&&n!=="default"&&r(t,n,{get:()=>o[n],enumerable:!(e=d(o,n))||e.enumerable});return t},i=t=>h(y(r(t!=null?g(C(t)):{},"default",t&&t.__esModule&&"default"in t?{get:()=>t.default,enumerable:!0}:{value:t,enumerable:!0})),t);var b={};I(b,{default:()=>P});var f=i(a("@yarnpkg/core")),c={afterInstall:{description:"Hook that will always run after install",type:f.SettingsType.STRING,default:""}};var u=i(a("clipanion")),p=i(a("@yarnpkg/core"));var m=i(a("@yarnpkg/shell")),l=async(t,o)=>{let e=t.get("afterInstall");return e?(o&&console.log("Running `afterInstall` hook..."),(0,m.execute)(e,[],{cwd:t.projectCwd||void 0})):0};var s=class extends u.Command{async execute(){let o=await p.Configuration.find(this.context.cwd,this.context.plugins);return l(o,!1)}};s.paths=[["after-install"]];var w={configuration:c,commands:[s],hooks:{afterAllInstalled:async t=>{if(await l(t.configuration,!0))throw new Error("The `afterInstall` hook failed, see output above.")}}},P=w;return b;})();
return plugin;
}
};
