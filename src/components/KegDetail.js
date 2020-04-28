import React from "react";
import PropTypes from "prop-types";

function KegDetail(props){
  const { keg, onClickingDelete, onClickingTap, onClickingFill } = props;
  return (
    <React.Fragment>
      <hr/>
      <h1>Keg Details:</h1>
      <h2>{keg.brand} presents:</h2>
      <h3>{keg.name}</h3>
      <p><em>{keg.description}</em></p>
      <p><strong>abv</strong>: <em>{keg.abv}</em></p>
      <p><strong>Price</strong>: <em>{keg.price}</em></p>
      <p><strong>Pints</strong>: <em>{keg.pints}</em></p>
      <button onClick={()=> props.onClickingTap(keg.id) }>Tap Keg</button>
      <button onClick={()=> props.onClickingFill(keg.id) }>Fill Keg</button>
      <button onClick={ props.onClickingEdit }>Update Keg</button>
      <button onClick={()=> props.onClickingDelete(keg.id) }>Delete Keg</button>
      <br/>
      <br/>
      <hr/>
    </React.Fragment>
  );
}

KegDetail.propTypes = {
  keg: PropTypes.object,
  onClickingDelete: PropTypes.func,
  onClickingEdit: PropTypes.func,
  onClickingTap: PropTypes.func,
  onClickingFill: PropTypes.func
};

export default KegDetail;