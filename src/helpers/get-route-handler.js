const hasNumber = (text) => /\d/.test(text);

const getIdWithUrl = (url) => {
  const pathName = url.pathname;
  const lastIndex = pathName.lastIndexOf("/");
  const idString = pathName.slice(lastIndex + 1).trim();
  if (idString === "") {
    return pathName.slice(0, lastIndex);
  }
  if (!hasNumber(idString)) {
    return pathName;
  }
  const idNumber = +idString;
  if (idNumber && lastIndex !== -1) {
    return pathName.slice(0, lastIndex);
  }
  return pathName;
};

const routeHandler = (routerConfig, url) => {
  const clearUrl = getIdWithUrl(url);
  return routerConfig[clearUrl];
};
module.exports = routeHandler;
