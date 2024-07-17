import axios from 'axios';
import { logger } from "react-native-logs";

import {DOMParser} from 'xmldom';
import DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';

export default class MapService{
  
  //API path that this service class uses
  apiPath = "api/auth";

  //create full URI for the API endpoint
  API_URL = process.env.API_URL + ":" + process.env.API_PORT +   this.apiPath;
  
  //logger
  log: any;

 
    constructor() {
      this.log = logger.createLogger();
    }


    async getMap(eventID: string) : Promise<Document | undefined>{

        try {
     
            fetch('@/app/assets/data/PorcfestMap.kml')
            .then(r=>r.text())
            .then(text => {
                
              const kml = new DOMParser().parseFromString(text);
            
              //don't convert here
              //const converted = kml(theKml);
              this.log.info('got KML: '  + kml );
  
              return kml;

            });

            
            } catch (err) {
           
                throw err;
              
            }
            return ;
    }




}