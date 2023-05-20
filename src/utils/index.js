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

module.exports = {
  getInfoData,
  selectData,
};
