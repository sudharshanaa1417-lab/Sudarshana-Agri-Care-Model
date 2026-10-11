const Module = require('module');
const origRequire = Module.prototype.require;

Module.prototype.require = function (id) {
  const res = origRequire.apply(this, arguments);
  if (id === 'minipass' && res && typeof res === 'function' && !res.Minipass) {
    res.Minipass = res;
  }
  return res;
};
