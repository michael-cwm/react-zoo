import axios from "axios";
import { response } from "express";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IAnimal } from "../../models/IAnimals";
import { save, getList } from "../../services/StorageService";
import { StyledButton } from "../StyledComponents/StyledButton";
import { StyledHeader } from "../StyledComponents/StyledHeader";
import {
  AnimalWrapper,
  ImageWrapper,
} from "../StyledComponents/StyledWrappers";

export const Animals = () => {
  const [animals, setAnimals] = useState<IAnimal[]>(getList);

  useEffect(() => {
    if (animals.length === 0) {
      axios
        .get("https://animals.azurewebsites.net/api/animals")
        .then((response) => {
          setAnimals(response.data);
          save(response.data);
        });
    }
  }, []);

  const showAnimals = animals.map((animal: IAnimal) => {
    return (
      <>
        <AnimalWrapper key={animal.id}>
          <h3>{animal.name}</h3>
          <ImageWrapper>
            <img src={animal.imageUrl} alt={animal.name} />
          </ImageWrapper>
          <h4>Född: {animal.yearOfBirth}</h4>
          <div className="textWrapper">
            <p>{animal.shortDescription}</p>
            <div className="buttonWrapper">
              <Link to={"/animal/" + animal.id}>
                <StyledButton>Mer info</StyledButton>
              </Link>
            </div>
          </div>
        </AnimalWrapper>
      </>
    );
  });

  return <>{showAnimals};</>;
};
