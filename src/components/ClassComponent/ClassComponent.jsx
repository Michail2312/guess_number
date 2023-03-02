import React from "react";
import style from "./ClassComponent.module.css";
import PropTypes from "prop-types";

export class ClassComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: "Введите Ваше число",
      numberUser: "",
      attemptCounter: 0,
      play: false,
      randomNumber:
        Math.floor(Math.random() * this.props.max - this.props.min) +
        this.props.min,
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState(({ numberUser, randomNumber, attemptCounter }) => {
      if (!numberUser) return this.state;
      if (numberUser > randomNumber) {
        return {
          result: `Число ${numberUser} больше загаданного`,
          numberUser: "",
          attemptCounter: attemptCounter + 1,
        };
      }
      if (numberUser < randomNumber) {
        return {
          result: `Число ${numberUser} меньше загаданного`,
          numberUser: "",
          attemptCounter: attemptCounter + 1,
        };
      }
      return {
        result: `Ура! Вы отгадали с ${attemptCounter + 1} раза`,
        numberUser: "",
        play: true,
      };
    });
  };

  handleChange = (e) => {
    this.setState({ numberUser: e.target.value });
  };

  handleClick = () => {
    this.setState({
      result: "Введите Ваше число",
      numberUser: "",
      attemptCounter: 0,
      play: false,
      randomNumber:
        Math.floor(Math.random() * this.props.max - this.props.min) +
        this.props.min,
    });
  };

  render() {
    const { result, numberUser, play } = this.state;
    const playAgain = play ? (
      <button className={style.btn} onClick={this.handleClick}>
        Сыграть еще
      </button>
    ) : (
      <button className={style.btn}>Угадать</button>
    );

    return (
      <div className={style.game}>
        <p className={style.result}>{result}</p>

        <form className={style.form} onSubmit={this.handleSubmit}>
          <label className={style.label} htmlFor="user_number">
            Угадай число
          </label>

          <input
            className={style.input}
            type="number"
            id="user_number"
            value={numberUser}
            onChange={this.handleChange}
          />
          {playAgain}
        </form>
      </div>
    );
  }
}

ClassComponent.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
};
