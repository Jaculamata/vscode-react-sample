var fs = require('fs');
var _ = require('lodash');

var DATA = 'data/deletetodos.json';
var PRETTIFY_WS = 4;

function getAll(resolve) {
    fs.readFile(DATA, function(err, data) {
      resolve(JSON.parse(data));
    });
}

function commit(data, resolve) {
    fs.writeFile(DATA, JSON.stringify(data, null, PRETTIFY_WS));
}

function add(deletetodo, resolve) {
    getAll(function (data) {
        data.deletetodos.push(deletetodo);
        commit(data);
        resolve(data);
    });
}

function del(id, resolve) {
    getAll(function (data) {
        var deletetodos = _.filter(data.deletetodos, function (todo) {
            return todo.id != id;
        });
        data.deletetodos = deletetodos;
        commit(data);
        resolve(data);
    });
}

module.exports = {
  getAll: getAll,
  commit: commit,
  add: add,
  del: del
}