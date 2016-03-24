'use strict';

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function normalizeToArray(object) {
  if (!object) return [];
  return Object.keys(object).map(key => {
    let normalizedObject = object[key];
    normalizedObject.id = key;
    return normalizedObject;
  })
}