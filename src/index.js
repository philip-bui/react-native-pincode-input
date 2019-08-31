import React, { PureComponent } from "react";
import { StyleSheet, View, Animated, TextInput } from "react-native";
import PropTypes from "prop-types";

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFill
  },
  circleContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly"
  },
  circle: {
    width: 17,
    height: 17,
    borderRadius: 50
  },
  text: {
    ...StyleSheet.absoluteFill,
    position: "absolute",
    opacity: 0
  }
});

export default class PincodeInput extends PureComponent {
  static propTypes = {
    pin: PropTypes.string.isRequired,
    length: PropTypes.number,
    onTextChange: PropTypes.func.isRequired,
    containerStyle: PropTypes.object,
    circleContainerStyle: PropTypes.object,
    circleEmptyStyle: PropTypes.object,
    circleFilledStyle: PropTypes.object,
    autoFocus: PropTypes.bool,
    keyboardType: PropTypes.oneOf([
      "default",
      "number-pad",
      "decimal-pad",
      "numeric",
      "email-address",
      "phone-pad"
    ])
  };

  static defaultProps = {
    length: 4,
    containerStyle: {},
    circleContainerStyle: {
      paddingHorizontal: 32
    },
    circleEmptyStyle: {
      borderWidth: 1,
      borderColor: "#424242"
    },
    circleFilledStyle: {
      backgroundColor: "#424242"
    },
    autoFocus: true,
    keyboardType: "numeric"
  };

  state = {
    shakeAnim: new Animated.Value(0)
  };

  onTextChange = text => {
    const regex = "^[0-9]*$";
    const { onTextChange, length } = this.props;
    if (text.match(regex) && text.length <= length) {
      onTextChange(text);
    }
  };

  shake = () => {
    const { shakeAnim } = this.state;
    const values = [10, -7.5, 5, -2.5, 0];
    const duration = 75;
    Animated.sequence(
      values.map(toValue => Animated.timing(shakeAnim, { toValue, duration }))
    ).start();
  };

  render() {
    const { shakeAnim } = this.state;
    const {
      pin,
      containerStyle,
      circleContainerStyle,
      circleEmptyStyle,
      circleFilledStyle,
      length,
      autoFocus,
      keyboardType
    } = this.props;
    const circleEmptyStyles = StyleSheet.flatten([
      styles.circle,
      circleEmptyStyle
    ]);
    const circleFilledStyles = StyleSheet.flatten([
      styles.circle,
      circleFilledStyle
    ]);
    const circles = [];
    for (let i = 0; i < length; i += 1) {
      circles.push(
        <View style={pin.length > i ? circleFilledStyles : circleEmptyStyles} />
      );
    }
    return (
      <View
        style={StyleSheet.flatten([styles.container, containerStyle])}
        accessible
        accessibilityLabel="Pincode"
        accessibilityHint="Type your pincode"
        accessibilityElementsHidden
      >
        <Animated.View
          style={StyleSheet.flatten([
            styles.circleContainer,
            circleContainerStyle,
            { left: shakeAnim }
          ])}
        >
          {circles}
        </Animated.View>

        <TextInput
          style={styles.text}
          caretHidden
          autoFocus={autoFocus}
          maxLength={length}
          keyboardType={keyboardType}
          onChangeText={this.onTextChange}
          value={pin}
        />
      </View>
    );
  }
}
