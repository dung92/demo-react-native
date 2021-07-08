import React from 'react';
import {
  Input,
  NativeBaseProvider,
  FormControl,
  Button,
  VStack,
  Checkbox,
  Text,
  Radio,
  Select,
} from 'native-base';
import {useForm, Controller} from 'react-hook-form';
import DatePicker from 'react-native-date-picker';
import {format} from 'date-fns';
const Example = () => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    mode: 'all',
  });

  const onSubmit = data => {
    alert(JSON.stringify(data), 'alo232');
    console.log('submiting with ', data);
  };

  return (
    <NativeBaseProvider>
      <VStack width="80%" space={4} ml={3} mt={3}>
        <FormControl isRequired isInvalid={'firstName' in errors}>
          <FormControl.Label>First Name</FormControl.Label>
          <Controller
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <Input
                onBlur={onBlur}
                placeholder="John"
                onChangeText={val => onChange(val)}
                value={value}
              />
            )}
            name="firstName"
            rules={{
              required: 'Field is required',
              maxLength: {
                value: 30,
                message: 'Must fill smaller than 30 characters',
              },
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: 'Entered value does not match email format',
              },
            }}
            defaultValue=""
          />
          <FormControl.ErrorMessage>
            {errors.firstName?.message}
          </FormControl.ErrorMessage>
        </FormControl>
        <FormControl isRequired isInvalid={'hobbies' in errors}>
          <FormControl.Label>Hobbies</FormControl.Label>
          <Controller
            control={control}
            render={({field: {onChange, onBlur}}) => (
              <Checkbox.Group
                onChange={values => {
                  onChange(values);
                }}
                onBlur={onBlur}
                flexDirection="row">
                <Checkbox value="dart" accessibilityLabel="dart">
                  <Text mx={2}>Darts</Text>
                </Checkbox>
                <Checkbox value="movie" accessibilityLabel="movie">
                  <Text mx={2}>Movie</Text>
                </Checkbox>
                <Checkbox value="camping" accessibilityLabel="camping">
                  <Text mx={2}>Camping</Text>
                </Checkbox>
                <Checkbox value="chess" accessibilityLabel="chess">
                  <Text mx={2}>chess</Text>
                </Checkbox>
              </Checkbox.Group>
            )}
            rules={{required: 'Atleast 1 hobbie needed'}}
            name="hobbies"
            defaultValue=""
          />
          <FormControl.ErrorMessage>
            {errors.hobbies?.message}
          </FormControl.ErrorMessage>
        </FormControl>
        <FormControl isRequired isInvalid={'gender' in errors}>
          <FormControl.Label>Gender</FormControl.Label>
          <Controller
            control={control}
            render={({field: {onChange, onBlur}}) => (
              <Radio.Group
                name="gender"
                flexDirection="row"
                onBlur={onBlur}
                onChange={val => onChange(val)}>
                <Radio
                  value="male"
                  colorScheme="blue"
                  accessibilityLabel="male">
                  <Text mx={2}>Male</Text>
                </Radio>
                <Radio
                  value="female"
                  colorScheme="blue"
                  accessibilityLabel="female">
                  <Text mx={2}>Female</Text>
                </Radio>
              </Radio.Group>
            )}
            name="gender"
            rules={{required: 'Gender is required'}}
          />
          <FormControl.ErrorMessage>
            {errors.gender?.message}
          </FormControl.ErrorMessage>
        </FormControl>

        <FormControl isRequired isInvalid={'language' in errors}>
          <FormControl.Label>Fav language:</FormControl.Label>
          <Controller
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <Select
                placeholder="Pick language"
                selectedValue={value}
                minWidth={200}
                onValueChange={itemValue => {
                  onChange(itemValue);
                }}
                onBlur={onBlur}>
                <Select.Item label="JavaScript" value="js" />
                <Select.Item label="TypeScript" value="ts" />
                <Select.Item label="Java" value="java" />
                <Select.Item label="Php" value="php" />
                <Select.Item label="Nodejs" value="nodejs" />
              </Select>
            )}
            name="language"
            rules={{required: 'Field is required'}}
            defaultValue="js"
          />
          <FormControl.ErrorMessage>
            {errors.language?.message}
          </FormControl.ErrorMessage>
        </FormControl>
        <FormControl>
          <FormControl.Label>Date:</FormControl.Label>
          <Controller
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <DatePicker
                onBlur={onBlur}
                onDateChange={val => onChange(val)}
                androidVariant="nativeAndroid"
                date={value ? value : new Date()}
              />
            )}
            name="date"
          />
        </FormControl>

        <Button onPress={handleSubmit(onSubmit)} colorScheme="pink" mt={2}>
          <Text color="white">Submit</Text>
        </Button>
      </VStack>
    </NativeBaseProvider>
  );
};
export default Example;
