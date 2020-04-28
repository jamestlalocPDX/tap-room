import React from 'react';
import KegDetail from './KegDetail';
import NewKegForm from './NewKegForm';
import EditKegForm from './EditKegForm';
import Menu from './Menu';

class KegControl extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      formVisibleOnPage: false,
      masterMenu: [
        {
          name: "Manta Ray",
          brand: "Ballast Point",
          description: "Oh so tasty!",
          abv: "7.8%",
          price: "$12.99",
          pints: 124,
          id: 1
        },
        {
          name: "Pacific Wonderland",
          brand: "Deschutes Brewery",
          description: "So hoppy!",
          abv: "5.5%",
          price: "$10.99",
          pints: 124,
          id: 2
        },
        {
          name: "Pearl IPA",
          brand: "10 Barrel",
          description: "Citrus hops!",
          abv: "8%",
          price: "$13.99",
          pints: 124,
          id: 3
        },
        {
          name: "Starburst IPA",
          brand: "Ecliptic Brewery",
          description: "Damn hops!",
          abv: "7.8%",
          price: "$13.99",
          pints: 124,
          id: 4
        },
        {
          name: "Victory at Sea",
          brand: "Ballast Point",
          description: "Best dark brew around!",
          abv: "12%",
          price: "$13.99",
          pints: 124,
          id: 5
        },
      ],
      selectedKeg: null,
      editing: false
    };
  }
  
  handleAddingNewKegToMenu = (newKeg) => {
    const newMasterMenu = this.state.masterMenu.concat(newKeg);
    this.setState({masterMenu: newMasterMenu});
    this.setState({formVisibleOnPage: false});
  }

  handleChangingSelectedKeg = (id) => {
    const selectedKeg = this.state.masterMenu.filter(keg => keg.id === id)[0];
    this.setState({selectedKeg: selectedKeg});
  }

  handleEditClick = () => {
    this.setState({editing: true});
  }

  handleEditingKegInList = (kegToEdit) => {
    const editedMasterMenu = this.state.masterMenu
      .filter(keg => keg.id !== this.state.selectedKeg.id)
      .concat(kegToEdit);
    this.setState({
        masterMenu: editedMasterMenu,
        editing: false,
        selectedKeg: null
      });
  }

  handleDeletingKeg = (id) => {
    const newMasterMenu = this.state.masterMenu.filter(keg => keg.id !== id);
    this.setState({
      masterMenu: newMasterMenu,
      selectedKeg: null
    });
  }

  handleTappingKeg = (id) => {
    const kegToTap = this.state.masterMenu.filter(keg => keg.id === id)[0];
    const tappingKeg = kegToTap.pints - 1;
    const tappedKeg = {...kegToTap, pints: tappingKeg};
    const kegMenu = this.state.masterMenu.filter(keg => keg.id != id);
    this.setState({
      masterMenu: [...kegMenu, tappedKeg],
      selectedKeg: tappedKeg
    });
  }

  handleFillingKeg = (id) => {
    const newMasterMenu = this.state.masterMenu[0].pints + 1;
    this.setState({
      masterMenu: newMasterMenu,
    });
  }
  
  handleClick = () => {
    if (this.state.selectedKeg != null) {
      this.setState({
        formVisibleOnPage: false,
        selectedKeg: null,
        editing: false
      });
    } else {
      this.setState(prevState => ({
        formVisibleOnPage: !prevState.formVisibleOnPage,
      }));
    }
  }

  render(){
    let currentlyVisibleState = null;
    let buttonText = null;
    
    if (this.state.editing ) {      
      currentlyVisibleState = <EditKegForm 
      keg = {this.state.selectedKeg} 
      onEditKeg = {this.handleEditingKegInList}/>;
      buttonText = "Return to Menu";
    } else if (this.state.selectedKeg != null) {
        currentlyVisibleState = <KegDetail 
        keg = {this.state.selectedKeg}
        onClickingTap = {this.handleTappingKeg}
        // onClickingFill = {this.handleFillingKeg} 
        onClickingDelete = {this.handleDeletingKeg}
        onClickingEdit = {this.handleEditClick} />;
        buttonText = "Return to Menu";
    } else if (this.state.formVisibleOnPage) {
        currentlyVisibleState = <NewKegForm 
        onNewKegCreation={this.handleAddingNewKegToMenu} />;
        buttonText = "Return to Menu";
    } else {
        currentlyVisibleState = <Menu 
        menu = {this.state.masterMenu} 
        onKegSelection = {this.handleChangingSelectedKeg} />;
        buttonText = "Add Keg!";
    }
    return (
      <React.Fragment>
        {currentlyVisibleState}
        <button onClick={this.handleClick}>{buttonText}</button>
      </React.Fragment>
    );
  }
}

export default KegControl;