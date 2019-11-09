import React, { useState, useEffect } from "react";
import { useHttp } from "../hooks/http.js";
import Summary from "./Summary";

const Character = props => {
  const [isLoading, data] = useHttp(
    "https://swapi.co/api/people/" + +props.selectedChar,
    [props.selectedChar]
  );
  const loadedCharacter = data
    ? {
        id: props.selectedChar,
        name: data.name,
        height: data.height,
        colors: {
          hair: data.hair_color,
          skin: data.skin_color
        },
        gender: data.gender,
        movieCount: (data.films || {}).length
      }
    : [];

  console.log("rendering");

  // useEffect(() => {
  //   fetchData();
  //   return () => {
  //     console.log("cleaning up");
  //   };
  // }, [props.selectedChar]);

  // useEffect(() => {
  //   return () => {
  //     console.log("unmount");
  //   };
  // }, []);

  // const fetchData = () => {
  //   console.log(
  //     "Sending Http request for new character with id " + props.selectedChar
  //   );
  //   setIsLoading(true);
  //   fetch("https://swapi.co/api/people/" + props.selectedChar)
  //     .then(response => {
  //       if (!response.ok) {
  //         throw new Error("Could not fetch person!");
  //       }
  //       return response.json();
  //     })
  //     .then(charData => {
  //       const loadedCharacter = {
  //         id: props.selectedChar,
  //         name: charData.name,
  //         height: charData.height,
  //         colors: {
  //           hair: charData.hair_color,
  //           skin: charData.skin_color
  //         },
  //         gender: charData.gender,
  //         movieCount: charData.films.length
  //       };
  //       setLoadedCharacter(loadedCharacter);
  //       setIsLoading(false);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //       setIsLoading(false);
  //     });
  // };

  // componentWillUnmount() {
  //   console.log('Too soon...');
  // }

  let content = <p>Loading Character...</p>;

  if (!isLoading && loadedCharacter.id) {
    content = (
      <Summary
        name={loadedCharacter.name}
        gender={loadedCharacter.gender}
        height={loadedCharacter.height}
        hairColor={loadedCharacter.colors.hair}
        skinColor={loadedCharacter.colors.skin}
        movieCount={loadedCharacter.movieCount}
      />
    );
  } else if (!isLoading && !loadedCharacter.id) {
    content = <p>Failed to fetch character.</p>;
  }
  return content;
};

export default React.memo(Character);
