import * as React from "react";
import * as ReactDOM from "react-dom";
import * as _ from "lodash";
const data = require("../assets/data/people.json");

interface IOwner {
    name:string;
    gender:string;
    age:number;
    pets:IPet[];
}

interface IPet {
    name:string;
    type:string;
}


class App extends React.Component<any, any>{

  constructor(public props: any) {
      super(props);
      console.log("data", data, _);
  }

  getPets = (petType, ownerGender) => {

    let owners:any;
    // find owners with gender == ownerGender
    owners = _.filter(data, (owner:IOwner)=>{
      if(owner.gender == ownerGender){
        // and only return owners that have pets
        return owner.pets
      }
    });

    let pets:any[] = [];
    // concatenate and sort by name all filtered pets that have a type of petType
    _.forEach(owners, (owner:IOwner) => {
        pets = _.sortBy(pets.concat(_.filter(owner.pets, (pet:IPet)=>{return pet.type == petType})), [(pet:IPet) => { return pet.name; }]);
    });

    // finally render the list
    let petlist = pets.map((pet:IPet, i)=>{
        return <li key={i}>{pet.name}</li>
    });

    if(!_.isEmpty(petlist)){
      return(
        <div>
          <h1>{ownerGender}</h1>
          <ul>{petlist}</ul>
        </div>)
    }
  }

  render() {
    return (
      <div>
          {this.getPets("Cat", "Female")}
          {this.getPets("Cat", "Male")}
      </div>
    );
  }

}

export = App;
