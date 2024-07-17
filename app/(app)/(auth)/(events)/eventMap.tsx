import React, { useEffect, useRef, useState } from 'react';
import MapView, { Callout, Marker, PROVIDER_GOOGLE, Region,  Geojson } from 'react-native-maps';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from 'expo-router';

import MapBloc from '@/app/blocs/MapBloc';
import { logger } from "react-native-logs";
import type { FeatureCollection, Geometry, GeoJsonProperties } from "geojson";


const INITIAL_REGION = {
	latitude: 37.33,
	longitude: -122,
	latitudeDelta: 2,
	longitudeDelta: 2
};



export default function App() {
	const navigation = useNavigation();
	const [eventLocation, setEventLocation] = useState<FeatureCollection<Geometry, GeoJsonProperties>>();

	//
	let log = logger.createLogger();

	useEffect(() => {
		navigation.setOptions({
			headerRight: () => (
				<TouchableOpacity onPress={focusMap}>
					<View style={{ padding: 10 }}>
						<Text>Focus</Text>
					</View>
				</TouchableOpacity>
			)
		});
	}, []);

	const focusMap = () => {
		const GreenBayStadium = {
			latitude: 44.5013,
			longitude: -88.0622,
			latitudeDelta: 0.1,
			longitudeDelta: 0.1
		};
	
		const mapBloc = new  MapBloc();  
		let geoJSON =  mapBloc.getMap('1');

		log.info('converteed kml is at map   geoJSON = ' + geoJSON );

		//setEventLocation(geoJSON as FeatureCollection<Geometry, GeoJsonProperties>);

		//mapRef.current?.animateToRegion(GreenBayStadium);

		// Or change the camera with a duration
		// mapRef.current?.animateCamera({ center: GreenBayStadium, zoom: 10 }, { duration: 2000 });
	};

	const onRegionChange = (region: Region) => {
		console.log(region);
	};

	//to call the function below to get the map data
	useEffect(() => {
		getMap();
	  }, []);



	async function getMap(){

		//get the geoJSON data
		const mapBloc = new  MapBloc();  
		
		let geoJSON: FeatureCollection<Geometry, GeoJsonProperties>;

		geoJSON = await mapBloc.getMap('1') as FeatureCollection;

		setEventLocation(geoJSON);
		 
	}

	return (
		<View style={{ flex: 1 }}>
			<MapView
				style={StyleSheet.absoluteFillObject}
				//initialRegion={INITIAL_REGION}
				showsUserLocation
				showsMyLocationButton
				provider={PROVIDER_GOOGLE}
				//ref={mapRef}
				onRegionChangeComplete={onRegionChange}
			>
				        <Geojson
						geojson={eventLocation as FeatureCollection<Geometry, GeoJsonProperties>}
						//strokeColor="red"
						//fillColor="green"
						strokeWidth={4}
						onPress={() => {}}
						/>
			</MapView>
        <Callout style={styles.buttonCallout}>
          <TouchableOpacity
            style={[styles.touchable]}
            onPress={() => console.log("press")}
          >
            <Text style={styles.touchableText}>I NEED HELP</Text>
          </TouchableOpacity>

        </Callout>

		</View>
	);

}


const styles = StyleSheet.create({
	container: {
	  flex: 1
	},
	buttonCallout: {
		flex: 1,
		flexDirection:'row',
		position:'absolute',
		bottom:10,
		alignSelf: "center",
		justifyContent: "space-between",
		backgroundColor: "transparent",
		borderWidth: 0.5,
		borderRadius: 20
	  },
	touchable: {
	  backgroundColor: "lightblue",
	  padding: 10,
	  margin: 10
	},
	touchableText: {
	  fontSize: 24
	},
	searchCallout: {
	  flexDirection: "row",
	  backgroundColor: "rgba(255, 255, 255, 0.9)",
	  borderRadius: 10,
	  width: "80%",
	  marginLeft: "5%",
	  marginTop: 40
	},
	calloutSearch: {
	  borderColor: "transparent",
	  marginLeft: 10,
	  width: "90%",
	  marginRight: 10,
	  height: 40,
	  borderWidth: 0.0
	}
  });