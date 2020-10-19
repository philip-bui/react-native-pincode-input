<p align="center">
<a href="https://github.com/philip-bui/react-native-pincode-input/raw/master/.github/images/pincode-input.png"><img src="https://github.com/philip-bui/react-native-pincode-input/raw/master/.github/images/pincode-input.png" title="Pincode Input" height="445" width="250"></a>
</p>

# React Native Pincode Input
[![Actions Status](https://github.com/philip-bui/react-native-pincode-input/workflows/build/badge.svg)](https://github.com/philip-bui/react-native-pincode-input/actions)
[![CodeCov](https://codecov.io/gh/philip-bui/react-native-pincode-input/branch/master/graph/badge.svg)](https://codecov.io/gh/philip-bui/react-native-pincode-input)
[![npm](https://img.shields.io/npm/v/react-native-pincode-input.svg?style=flat)](https://www.npmjs.com/package/react-native-pincode-input)
![Downloads](https://img.shields.io/npm/dt/react-native-pincode-input.svg?style=flat)

React Native Pincode Input is a iOS Lock Screen style pincode input.

## Installation

```bash
$ npm install react-native-pincode-input
```

```
$ yarn add react-native-pincode-input
```

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
          display: "flex",
          width: "100%",
          height: 200,
          justifyContent: "center"
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
