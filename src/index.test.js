import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import PincodeInput from ".";

describe("ReactNativePincodeInput", () => {
  it("renders correctly", () => {
    const { toJSON } = render(<PincodeInput pin="1" />);
    expect(toJSON()).toMatchInlineSnapshot(`
      <View
        style={
          Object {
            "display": "flex",
            "height": 200,
            "justifyContent": "center",
            "width": "100%",
          }
        }
      >
        <View
          style={
            Object {
              "alignItems": "center",
              "flexDirection": "row",
              "justifyContent": "space-evenly",
              "left": 0,
              "paddingHorizontal": 32,
              "width": "100%",
            }
          }
        >
          <View
            style={
              Object {
                "backgroundColor": "#424242",
                "borderRadius": 50,
                "height": 17,
                "width": 17,
              }
            }
          />
          <View
            style={
              Object {
                "borderColor": "#424242",
                "borderRadius": 50,
                "borderWidth": 1,
                "height": 17,
                "width": 17,
              }
            }
          />
          <View
            style={
              Object {
                "borderColor": "#424242",
                "borderRadius": 50,
                "borderWidth": 1,
                "height": 17,
                "width": 17,
              }
            }
          />
          <View
            style={
              Object {
                "borderColor": "#424242",
                "borderRadius": 50,
                "borderWidth": 1,
                "height": 17,
                "width": 17,
              }
            }
          />
        </View>
        <TextInput
          accessibilityHint="Enter your pincode"
          accessibilityLabel="Pincode"
          accessibilityRole="text"
          accessible={true}
          allowFontScaling={true}
          autoFocus={true}
          caretHidden={true}
          keyboardType="numeric"
          maxLength={4}
          onChangeText={[Function]}
          rejectResponderTermination={true}
          style={
            Object {
              "bottom": 0,
              "left": 0,
              "opacity": 0,
              "position": "absolute",
              "right": 0,
              "top": 0,
            }
          }
          underlineColorAndroid="transparent"
          value="1"
        />
      </View>
    `);
  });

  it("displays pincode", () => {
    const { getByDisplayValue } = render(<PincodeInput pin="1" />);

    expect(getByDisplayValue("1")).toBeTruthy();
  });

  it("allows numeric input", () => {
    const onTextChange = jest.fn();
    const { getByDisplayValue } = render(
      <PincodeInput pin="1" onTextChange={onTextChange} />
    );

    const textInput = getByDisplayValue("1");

    fireEvent.changeText(textInput, "2");
    expect(onTextChange).toHaveBeenCalledWith("2");
  });

  it("disables alphabetic and special character input", () => {
    const onTextChange = jest.fn();
    const { getByDisplayValue } = render(
      <PincodeInput pin="1" onTextChange={onTextChange} />
    );

    const textInput = getByDisplayValue("1");

    fireEvent.changeText(textInput, "a");
    expect(onTextChange).not.toHaveBeenCalled();

    fireEvent.changeText(textInput, "A4");
    expect(onTextChange).not.toHaveBeenCalled();

    fireEvent.changeText(textInput, "#0");
    expect(onTextChange).not.toHaveBeenCalled();
  });

  it("disables overflowing input", () => {
    const onTextChange = jest.fn();
    const { getByDisplayValue } = render(
      <PincodeInput pin="1" onTextChange={onTextChange} length={2} />
    );

    const textInput = getByDisplayValue("1");

    fireEvent.changeText(textInput, "123");
    expect(onTextChange).not.toHaveBeenCalled();

    fireEvent.changeText(textInput, "A34");
    expect(onTextChange).not.toHaveBeenCalled();

    fireEvent.changeText(textInput, "#77");
    expect(onTextChange).not.toHaveBeenCalled();

    fireEvent.changeText(textInput, "77");
    expect(onTextChange).toHaveBeenCalled();
  });

  it("animates correctly", () => {
    let pincodeInput = React.createRef();
    const { getByDisplayValue } = render(
      <PincodeInput pin="1" ref={ref => (pincodeInput = ref)} />
    );

    expect(pincodeInput.shake).not.toThrow();
    expect(getByDisplayValue("1")).toBeTruthy();
  });

  it("unmounts correctly", () => {
    const { unmount } = render(<PincodeInput pin="1" />);
    expect(unmount).not.toThrow();
  });
});
