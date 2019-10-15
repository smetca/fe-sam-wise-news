import React, { Component } from 'react';
import styles from '../styles/Voter.module.css';
import * as api from '../utils/api';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowAltCircleUp, faArrowAltCircleDown} from '@fortawesome/free-solid-svg-icons';

class Voter extends Component {
  state = {
    voteChange: 0
  }

  handleVote = (event) => {
    event.preventDefault();
    const vote = Number(event.currentTarget.value);
    if(this.state.voteChange + vote <= 1 && this.state.voteChange + vote >= -1 ) {
      this.setState(({voteChange}) => {
        return {voteChange: voteChange + vote}
      })
      api.updateVote({inc_votes: vote}, event.currentTarget.name, this.props.type)
        .catch(() => {
          this.setState(({voteChange}) => {
            return {voteChange: voteChange - vote}
          })
        })
    }
  }

  render() {
    const {id, votes} = this.props;
    return (
      <div className={`${styles.voter} ${this.props.className}`}>
        <button className={styles.button} disabled={this.state.voteChange > 0} value='1' name={id} onClick={this.handleVote}><FontAwesomeIcon icon={faArrowAltCircleUp}/></button>
        <span className={styles.vote}>{votes + this.state.voteChange}</span>
        <button className={styles.button}disabled={this.state.voteChange < 0} value='-1' name={id} onClick={this.handleVote}><FontAwesomeIcon icon={faArrowAltCircleDown}/></button>
      </div>
    );
  }
}
 
export default Voter;