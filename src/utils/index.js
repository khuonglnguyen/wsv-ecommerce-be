const _ = require("lodash");

const getInfoData = ({ fileds = [], object = {} }) => {
  return _.pick(object, fileds);
};

const selectData = (select = [], isGet = 1) => {
  return Object.fromEntries(
    select.map((el) => {
      return [el, isGet];
    })
  );
};

const removeUndefinedItem = (obj) => {
  Object.keys(obj).forEach((k) => {
    if (obj[k] == null) {
      delete obj[k];
    }
  });

  return obj;
};

const updateNestedObjectPaser = (obj) => {
  const final = {};
  Object.keys(obj).forEach((k) => {
    if (obj[k] && typeof obj[k] === "object" && !Array.isArray(obj[k])) {
      const res = updateNestedObjectPaser(obj[k]);
      Object.keys(res).forEach((r) => {
        if (res[r]) {
          final[`${k}.${r}`] = res[r];
        }
      });
    } else {
      final[k] = obj[k];
    }
  });

  return final;
};

module.exports = {
  getInfoData,
  selectData,
  removeUndefinedItem,
  updateNestedObjectPaser,
};
