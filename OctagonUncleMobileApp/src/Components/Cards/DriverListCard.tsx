import {
  Box,
  FlatList,
  Button,
  Text,
  Fab,
  FabIcon,
  AddIcon,
  FabLabel,
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  ButtonText,
  CheckCircleIcon,
  HStack,
  Heading,
  Icon,
  View,
} from '@gluestack-ui/themed';
import {CustomButton1, CustomButton3} from '../Buttons';

const DriverListCard = ({
  firstName,
  lastName,
  email,
  expiryDate,
}: {
  firstName: string;
  lastName: string;
  email: string;
  expiryDate: Date;
}) => {
  return (
    <Box
      minWidth={230}
      minHeight={140}
      flex={1}
      borderRadius="$xl"
      borderWidth={1}
      sx={{
        borderColor: '$trueGray300',
        bg: '$trueGray100',
        _dark: {
          bg: '#071117',
          borderColor: '$borderDark800',
        },
      }}>
      <Box
        flex={4}
        px="$3"
        w="$full"
        justifyContent="center"
        sx={{
          borderBottomColor: '$trueGray300',
          bg: '$trueGray50',
          _dark: {
            borderBottomColor: '$borderDark800',
            bg: '#0C0E12',
          },
        }}>
        <View style={{flexDirection: 'row'}}>
          <View style={{width: '75%'}}>
            <Heading mb="$1" size="sm">
              {firstName + ' ' + lastName}
            </Heading>
            <Text size="xs">{email}</Text>
            <Text size="xs">
              {'Expiry date: ' + new Date(expiryDate).toDateString()}
            </Text>
          </View>
          <View>
            <CustomButton3
              title="Remove"
              onPress={() => {}}
              action="negative"
            />
          </View>
        </View>
      </Box>
    </Box>
  );
};
export default DriverListCard;
