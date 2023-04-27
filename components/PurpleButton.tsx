import { StyleSheet, View, Pressable, Text } from 'react-native';

export default function PurpleButton({ label, onPress, buttonWidth, buttonMarginHorizontal, marginLeftAuto, buttonTextColor, buttonBackgroundColor }: any) {
  return (
    <View style={[
                    styles.buttonContainer,
                    {
                      width:            buttonWidth != null ? buttonWidth : 320,
                      marginHorizontal: buttonMarginHorizontal != null ? buttonMarginHorizontal : 20,
                      marginLeft:       marginLeftAuto ? 'auto' : null
                    }]}>
      <Pressable style={[styles.button,
                        {
                          backgroundColor: buttonBackgroundColor != null ? buttonBackgroundColor : 'purple',
                          borderWidth: buttonBackgroundColor != null ? 1 : null,
                          borderColor: buttonBackgroundColor != null ? "purple" : null
                        }]} onPress={onPress}>
        <Text style={[styles.buttonLabel, {color: buttonTextColor != null ? buttonTextColor : 'white',}]}>{label}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: 320,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 3,
  },
  button: {
    borderRadius: 50,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: 'purple'
  },
  buttonIcon: {
    paddingRight: 8,
  },
  buttonLabel: {
    color: '#fff',
    fontSize: 16,
  },
});