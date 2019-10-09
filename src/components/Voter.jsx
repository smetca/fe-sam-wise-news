import React, { Component } from 'react';
import styles from '../styles/ArticleList.module.css';
import * as api from '../utils/api'

class Voter extends Component {
  state = {
    voteChange: 0
  }

  handleVote = (event) => {
    event.preventDefault();
    const vote = Number(event.target.value);
    if(this.state.voteChange + vote <= 1 && this.state.voteChange + vote >= -1 ) {
      this.setState(({voteChange}) => {
        return {voteChange: voteChange + vote}
      })
      api.updateVote({inc_votes: vote}, event.target.name, this.props.type)
        .catch(err => {
          this.setState(({voteChange}) => {
            return {voteChange: voteChange - vote}
          })
        })
    }
  }

  render() {
    const {id, votes} = this.props;
    return (
      <div className={styles.voter}>
        <button disabled={this.state.voteChange > 0} value='1' name={id} onClick={this.handleVote}>Up</button>
        <span>{votes + this.state.voteChange}</span>
        <button disabled={this.state.voteChange < 0} value='-1' name={id} onClick={this.handleVote}>Down</button>
      </div>
    );
  }
}
 
export default Voter;