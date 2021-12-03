/* eslint-disable */
//prettier-ignore
module.exports = {
name: "@yarnpkg/plugin-after-install",
factory: function (require) {
var plugin=(()=>{var g=Object.create,r=Object.defineProperty;var d=Object.getOwnPropertyDescriptor;var x=Object.getOwnPropertyNames;var k=Object.getPrototypeOf,C=Object.prototype.hasOwnProperty;var y=t=>r(t,"__esModule",{value:!0});var a=t=>{if(typeof require!="undefined")return require(t);throw new Error('Dynamic require of "'+t+'" is not supported')};var I=(t,o)=>{for(var n in o)r(t,n,{get:o[n],enumerable:!0})},h=(t,o,n)=>{if(o&&typeof o=="object"||typeof o=="function")for(let e of x(o))!C.call(t,e)&&e!=="default"&&r(t,e,{get:()=>o[e],enumerable:!(n=d(o,e))||n.enumerable});return t},i=t=>h(y(r(t!=null?g(k(t)):{},"default",t&&t.__esModule&&"default"in t?{get:()=>t.default,enumerable:!0}:{value:t,enumerable:!0})),t);var b={};I(b,{default:()=>w});var f=i(a("@yarnpkg/core")),c={afterInstall:{description:"Hook that will always run after install",type:f.SettingsType.STRING,default:""}};var u=i(a("clipanion")),p=i(a("@yarnpkg/core"));var m=i(a("@yarnpkg/shell")),l=async(t,o)=>{let n=t.get("afterInstall");return n?(o&&console.log("Running `afterInstall` hook..."),(0,m.execute)(n)):0};var s=class extends u.Command{async execute(){let o=await p.Configuration.find(this.context.cwd,this.context.plugins);return l(o,!1)}};s.paths=[["after-install"]];var P={configuration:c,commands:[s],hooks:{afterAllInstalled:async t=>{if(await l(t.configuration,!0))throw new Error("The `afterInstall` hook failed, see output above.")}}},w=P;return b;})();
return plugin;
}
};
