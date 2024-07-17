
import MapService from "../api/MapService";
import { logger } from "react-native-logs";
import {kml} from '@tmcw/togeojson';

import type { FeatureCollection, Geometry, GeoJsonProperties } from "geojson";


export default class MapBloc {
    mapService: MapService;

  //logger
  log: any;

 
    constructor() {
        this.log = logger.createLogger();
        this.mapService = new MapService();

      }



      async getMap(eventID: string) : Promise<FeatureCollection<Geometry, GeoJsonProperties>>  {

        let geo : FeatureCollection<Geometry, GeoJsonProperties>;
        
        let mapKml = await this.mapService.getMap(eventID)
        
        //convert to  GeoJson
        const geoJSON = kml(mapKml as Document);

        geo = geoJSON as FeatureCollection<Geometry, GeoJsonProperties>;

        //return value is: FeatureCollection<Geometry | null, GeoJsonProperties>
        return geo;
    


      }


  }