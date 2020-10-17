let fs = require('fs')
let striptags = require('striptags');

/***** Saving Errors To Filesystem *****/

// usage: node error-generator.js

var DATA_MODEL_OUTPUT_DIR = "../../validator/data-models/versions/2.x/models/";

// Remove all existing models that end in Error.json
let regex = /Error\.json$/
fs.readdirSync(DATA_MODEL_OUTPUT_DIR)
    .filter(f => regex.test(f) && f != 'OpenBookingError.json')
    .map(f => {
      fs.unlinkSync(DATA_MODEL_OUTPUT_DIR + f);
      console.log("DELETED: " + f);
    });

// Read specification source file
var data;
data = fs.readFileSync('edit.html', 'utf8'); 

// Match lines like | `IncompleteAttendeeDetailsError`            | 409         |

var re = /\| `(.*Error)` *\| *([0-9]+) *\| *(.+) *\|/g;
var m;

do {
    m = re.exec(data);
    if (m) {
        
        let errorName = m[1];
        let statusCode = m[2];
        let useCase = m[3];
        writeFile(errorName, createErrorFromTemplate(errorName, statusCode, useCase));
    }
} while (m);


function createErrorFromTemplate(errorName, statusCode, useCase) {
  var plainTextUseCase = striptags(useCase).replace(/"/g,'').trim();

  let firstLineOfUseCaseIndex = useCase.indexOf('<br>');
  let firstLineOfUseCase = firstLineOfUseCaseIndex > -1 ? useCase.substring(0, firstLineOfUseCaseIndex) : useCase; 
  var shortDescription = striptags(firstLineOfUseCase).replace(/"/g,'\\"').replace(/`/g,'\'').trim();
  
  var errorType = errorName.indexOf('Internal') === 0 && errorName !== 'InternalOpenBookingError' ? 'InternalOpenBookingError' : 'OpenBookingError';

  return `{
  "type": "${errorName}",
  "subClassOf": "#${errorType}",
  "description": {
    "sections": [
      {
        "title": "Error Use Case",
        "paragraphs": [
          "${plainTextUseCase}"
        ]
      }
    ]
  },
  "fields": {
    "type": {
        "fieldName": "type",
        "requiredContent": "${errorName}",
        "requiredType": "https://schema.org/Text"
    },
    "name": {
      "description": [
          "A short, human-readable summary of the problem type. It should not change from occurrence to occurrence of the problem, except for purposes of localization."
      ],
      "example": "${shortDescription}",
      "defaultContent": "${shortDescription}",
      "fieldName": "name",
      "requiredType": "https://schema.org/Text",
      "sameAs": "https://schema.org/name"
    },
    "statusCode": {
      "fieldName": "statusCode",
      "sameAs": "https://openactive.io/statusCode",
      "requiredType": "https://schema.org/Integer",
      "requiredContent": ${statusCode},
      "defaultContent": ${statusCode},
      "description": [
        "An integer representing the HTTP status code."
      ]
    }
  }
}
`
}


function writeFile(name, content) {
  var filename = name + ".json";
  
  console.log("NAME: " + filename);
  console.log(content);

  console.log("FILE SAVED: " + filename);
  
  fs.writeFile(DATA_MODEL_OUTPUT_DIR + filename, content, function (err) {
      if (err) {
          return console.log(err);
      }

      console.log("FILE SAVED: " + filename);
  });
}