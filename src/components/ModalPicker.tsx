import React, { SetStateAction, useEffect, useState } from 'react'
import { View, StyleSheet, TouchableOpacity, Dimensions, ScrollView, Text, Modal, Image, ImageSourcePropType } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import StyledText from './StyledText';

export type Option = {
  value: string,
  icon?: ImageSourcePropType, 
}

type ModalPickerProps = {
  options: Option[],
  onItemPress?: (option?: Option) => void,
  selectedOption: Option | null
  setSelectedOption: React.Dispatch<React.SetStateAction<Option | null>>
}


const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;


function ModalPicker({ options, onItemPress, selectedOption, setSelectedOption }: ModalPickerProps) {

  const [isModalVisible, setIsModalVisible] = useState(false)

  useEffect(() => {
    if (!selectedOption) {
      setSelectedOption(options[0])
    }
  }, [selectedOption])

  const changeModalVisibility = (bool: boolean) => {
    setIsModalVisible(bool)
  }

  const selectOption = (option: Option) => {
    setSelectedOption(option)
    changeModalVisibility(false)
    onItemPress && onItemPress()
  }

  return (
    <>

      <TouchableOpacity
        onPress={() => changeModalVisibility(true)}
        style={styles.select}>
        {
          selectedOption && (
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
              <View style={{flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                {selectedOption.icon && <Image source={selectedOption.icon} style={styles.icon}/>}
                <StyledText fontSize="small">{selectedOption.value}</StyledText>
              </View>
              <Ionicons name="chevron-down" size={16}/>
            </View>
          )
        }
      </TouchableOpacity>

      <Modal
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => changeModalVisibility(false)}
      >
        <TouchableOpacity
          onPress={() => changeModalVisibility(false)}
          style={styles.modalContainer}
        >
          <View style={[styles.modal]}>
            <ScrollView>
              {
                options.map((option, index) => (
                  <TouchableOpacity onPress={() => selectOption(option)} key={index} style={styles.option}>

                    {option.icon && <Image source={option.icon} style={styles.icon}/>}
                    <StyledText fontSize="small">{option.value}</StyledText>

                  </TouchableOpacity>
                ))
              }
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  )
}

const styles = StyleSheet.create({
  select: {
    backgroundColor: 'white',
    width: 150,
    justifyContent: 'center',
    height: 40,
    borderRadius: 30,
    paddingHorizontal: 16

  },
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,.5)',
  },
  modal: {
    backgroundColor: 'white',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: WIDTH - 20,
    maxHeight: HEIGHT / 2
  },
  option: {
    width: '100%',
    paddingVertical: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6
  },
  icon: {
    width: 16,
    height: 16
  }
})

export default ModalPicker