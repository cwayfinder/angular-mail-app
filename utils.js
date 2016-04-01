'use strict';

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function normalizeToArray(object) {
  if (!object) return [];
  return Object.keys(object).map(key => normalizeObject(object[key], key));
}

function normalizeObject(object, key) {
  object.id = key;
  return object;
}
