const fs = require("fs");
const ComponentConfig = require("./ComponentConfig");

StartGenerationComponent();

async function StartGenerationComponent()
{ 
    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    })
    
    readline.question(`Component name: `, name => {
        
        try
        {
            console.log(`Starting generation component...`);
            var config = new ComponentConfig();

            // Creating folder if not existing
            const dir = './src/component/'+name+'Component';
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, {
                    recursive: true
                });
            }

            //
            //TODO: Rewrite this and better
            //

            // Gets data from template and replaces naming
            var fileContent = config.ReturnPresetJS().toString();
            var data = fileContent.replaceAll("PlaceHolderClassnameComponent", name+"Component");
            // Creating new component file
            fs.writeFile('./src/component/'+name+'Component/'+name+'Component.js', data, function (err) 
            {
                fileContent = config.ReturnPresetHTML().toString();
                data = fileContent.replaceAll("PlaceHolderClassnameComponent", name+"Component");
                
                fs.writeFile('./src/component/'+name+'Component/'+name+'Component.html', data, function (err) 
                {
                    jsonComponent = JSON.parse(fs.readFileSync('metadep.json', 'utf8'));
                    jsonComponent['component'].push(""+name+"Component");
          
                    fs.writeFile('metadep.json', JSON.stringify(jsonComponent), function (err) 
                    {
                        if (err) throw err;
                            console.log('Component created successfully');
                    });
                });

            });

        }
        catch(error)
        {
            console.log(error);
        }

        readline.close();
    })

}