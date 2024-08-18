import * as React from "react";
import { View, Text, Button } from "react-native";
import { useForm } from "react-hook-form";
import { Range } from "react-range";

import { Link } from "expo-router"

import RangeSlider from 'react-range-slider-input';

export default function App() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const [values, setValues] = React.useState([50])
 
  const getMoviesFromApi = () => {
    return fetch('https://reactnative.dev/movies.json')
      .then(response => response.json())
      .then(json => {
        return json.movies;
      })
      .catch(error => {
        console.error(error);
      });
  };

  const onSubmit = (data) => getMoviesFromApi()

  console.log(watch("example")) // watch input value by passing the name of it


  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    
    <View>
        <Link href="/" asChild>
            <Button title="Go to Menu"/>
        </Link>
        <form onSubmit={handleSubmit(onSubmit)}>
        {/* register your input into the hook by invoking the "register" function */}
        <input defaultValue="num. of bottles" {...register("example")} />


        {/* include validation with required or other standard HTML validation rules */}
        <input {...register("exampleRequired", { required: true })} />
        {/* errors will return when field validation fails  */}
        {errors.exampleRequired && <span>This field is required</span>}

        <select {...register("forPrice")}>
            <option value="Yes">NumForPrice</option>
            <option value="No">No</option>
        </select>
        
        <Text>
            {'\n'}
            {'\n'}
            {'\n'}
            {'\n'}
        </Text>

        <Range {...register("numOfBottles")}
            label="Select your value"
            step={0.1}
            min={0}
            max={100}
            values={values}
            onChange={(values) => setValues(values)}
            renderTrack={({ props, children }) => (
                <div
                {...props}
                style={{
                    ...props.style,
                    height: "6px",
                    width: "100%",
                    backgroundColor: "#ccc",
                }}
                >
                {children}
                </div>
            )}
            renderThumb={({ props }) => (
                <div
                {...props}
                key={props.key}
                style={{
                    ...props.style,
                    height: "42px",
                    width: "42px",
                    backgroundColor: "#999",
                }}
                />
            )}
            />
        <input type="submit" />
        </form>
    </View>
  )
}