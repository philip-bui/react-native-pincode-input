# React Native Animated Loading Button

React Native Pincode Input is a iOS Lock Screen style pincode input.

## Usage

```javascript
import PincodeInput from "react-native-pincode-input";

export default class View extends React.Component {

  pincodeInput = React.createRef();

  shakePincode() {
    this.pincodeInput.shake();
  }

  handleOnTextChange(pin) {
    const { previousPin } = this.props;
    this.setState({ pin });
    if (pin !== previousPin) {
      this.shakePincode();
    }
  }

  render() {
    const { pin } = this.state;
    return <PincodeInput
        ref={pincodeInput => this.pincodeInput = pincodeInput}
        length={4}
        containerStyle={{
          width: "100%",
          height: 200
        }}
        circleContainerStyle={{
          paddingHorizontal: 32
        }}
        circleEmptyStyle={{
          borderWidth: 1,
          borderColor: "#424242"
        }}
        circleFilledStyle={{
          backgroundColor: "#424242"
        }}
        pin={pin}
        onTextChange={this.handleOnTextChange}
      />
  }
}
```

## Features

- [X] Pincode Input shake animation.
- [X] Supports Accessibility.

## License

React Native Pincode Input is available under the MIT license. [See LICENSE](https://github.com/philip-bui/react-native-pincode-input/blob/master/LICENSE) for details.
