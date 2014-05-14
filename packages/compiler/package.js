Package.describe({
  summary: "Template Compiler based off spacebars.compile"
});

Package.on_use(function(api) {
  api.use('spacebars-compiler');
  api.add_files('compiler.js', ['client', 'server']);
  api.export('Compiler', ['client', 'server']);
});