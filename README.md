# Genesis Seed Tiller

This project is the core behaviour for [seed-bank](https://github.com/seed-bank) projects.

## Details

Note that this project uses a few conventions in order to operate. They are:

1.  is required in the root folder of whereever the command line is envoked. However, no structure is required. In short, developers will write there own configuration for their generators.
2. genesis-templates.json is required in the directory OF THE GENERATOR CREATED. This means, when you create a generator, each module will have this file as well as all the files associated with it.
3. Within genesis-templates.json files that are prefixed with the '_' are assumed to be templates. Note that this is not enforced but is just a convention I like. In this case, this lib will remove the '_' char so that, for example, '_README.md' becomes 'README.md'. Note that you can override this with the override command. For example, the following will retain the '_' char.

```
{"name": "_README.md", "override": "_README.md"}
```
4. This lib will run all files as if they are templates. This may not always have desire affect. In cases where you would rather copy a file and apply no templating, the 'copy' command can be used.

```
{"name": "_README.md", "copy": true}
```

Note that in the above scenario, the '_README.md' file will be renamed to the 'README.md' file. If you want the prefix retained, simply combine the command from #3:

```
{"name": "_README.md", "override": "_README.md", "copy": true}
```

## Finally

The easiest way to use this lib is to simply install the [generator-genesis-seed](https://github.com/seed-bank/generator-genesis-seed) Yeoman generator. The generator-genesis-seed simplifies the effort of creating a Yeoman generator.