import React from "react";
import data from "@solid/query-ldflex";
import { useWebId } from "@inrupt/solid-react-components";
import {NavBar} from "../../components";
import { Value, List } from '@solid/react';

class SubFriendsComponent extends React.Component {
  
    state = {
        ...this.updateExpression(),
      }
    
      componentDidUpdate({ expression }) {
        if (this.props.expression !== expression)
          this.updateExpression();
      }
    
      updateExpression(input) {
        const expression = input || this.props.expression || '';
        // An expression has no side effects if it has no method calls
        // (conservatively identified by a parenthesis)
        const safe = !expression.includes('(');
        const state = {
          input: expression,
          // Don't evaluate unsafe expressions unless the user asks
          expression: input || safe ? expression : '',
          // Avoid evaluating unsafe expressions a second time
          sparql: expression && safe ? `${expression}.sparql` : '',
        };
        return this.state ? this.setState(state) : state;
      }
    
      onChangeExpression = event => {
        this.setState({ input: event.target.value });
      }
    
      onChangeMultiple = event => {
        this.setState({ multiple: event.target.checked });
      }
    
      onExecute = event => {
        event.preventDefault();
        const { input } = this.state;
        this.updateExpression(input);
        if (this.props.onExpressionChange)
          this.props.onExpressionChange(input);
      }
    
      render() {
        const { expression } = this.state;
        return (
            <div>
                <h3>Friends</h3>
                <List src={expression}>{(item, i) =>
                    <li key={i}>{linkTo(`${item}`)}</li>}
                </List>
            </div>
        );
      }
    }
    
    function linkTo(dest) {
      return !/^https?:/.test(dest) ? dest :
        <a href={dest} target="_blank" rel="noopener noreferrer">{dest}</a>;
    }



 /*   render() {
  
      return(
  
        <div>
          <h3>Friends</h3>
          <List src={expression}>{(item, i) =>
            <li key={i}>{linkTo(`${item}`)}</li>}
          </List>
        </div>
      );
  
    }
  
  }*/
  
  export default SubFriendsComponent;