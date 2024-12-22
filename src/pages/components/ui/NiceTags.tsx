import React, { useEffect, useRef, useState } from 'react';
import {
  IonChip,
  IonIcon,
  IonLabel,
  IonInput,
  IonButton,
  IonList,
  IonItem,
  IonText,
} from '@ionic/react';
import { closeCircleOutline, addOutline } from 'ionicons/icons';
import { styled } from 'styled-components';

const TagsContainer = styled.div`
  display: 'flex',
  gap: '0.5rem',
  flex-wrap: 'wrap',
`;

interface NiceTagsProps {
  initialTags?: string[];
  suggestions?: string[];
  onTagsChange?: (tags: string[]) => void;
}

const NiceTags: React.FC<NiceTagsProps> = ({
  initialTags = [],
  suggestions = [],
  onTagsChange,
}) => {
  const [tags, setTags] = useState<string[]>(initialTags);
  const [inputValue, setInputValue] = useState<string>('');
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);

  const addTag = (tag: string) => {
    if (tag.trim() && !tags.includes(tag.trim())) {
      const updatedTags = [...tags, tag.trim()];
      setTags(updatedTags);
      onTagsChange?.(updatedTags);
      setInputValue('');
      setFilteredSuggestions([]);
    }
  };

  const removeTag = (tagToRemove: string) => {
    const updatedTags = tags.filter((tag) => tag !== tagToRemove);
    setTags(updatedTags);
    onTagsChange?.(updatedTags);
  };

  const handleInputChange = (value: string) => {
    setInputValue(value);
    if (value.trim()) {
      const matches = suggestions.filter((suggestion) =>
        suggestion.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredSuggestions(matches);
    } else {
      setFilteredSuggestions([]);
    }
  };

  const inputRef = useRef<HTMLIonInputElement>(null);
  const [dropdownPosition, setDropdownPosition] = useState({
    top: 0,
    left: 0,
    width: 0,
  });

  useEffect(() => {
    if (inputRef.current) {
      const rect = inputRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,

        width: rect.width,
      });
    }
  }, [inputValue]);

  return (
    <div>
      <TagsContainer>
        {tags.map((tag, index) => (
          <IonChip key={index} color='primary'>
            <IonLabel>{tag}</IonLabel>
            <IonIcon icon={closeCircleOutline} onClick={() => removeTag(tag)} />
          </IonChip>
        ))}
      </TagsContainer>

      <div className='ion-flex ion-align-items-center ion-padding'>
        <IonInput
          ref={inputRef}
          placeholder='Add a tag'
          value={inputValue}
          onKeyUp={(e: React.KeyboardEvent<HTMLIonInputElement>) =>
            handleInputChange((e.target as HTMLInputElement).value)
          }
        />
        <IonButton
          onClick={() => addTag(inputValue)}
          color='secondary'
          fill='solid'
          disabled={!inputValue.trim()}
          style={{ marginLeft: '0.5rem' }}
        >
          <IonIcon icon={addOutline} slot='start' />
          Add
        </IonButton>
        {filteredSuggestions.length > 0 && (
          <IonList
            lines='none'
            style={{
              position: 'fixed',
              top: `${dropdownPosition.top}px`,
              left: `${dropdownPosition.left}px`,
              width: `${dropdownPosition.width}px`,
              //top: `500px`,
              //left: `10px`,
              //width: `500px`,
              zIndex: 9999, // Ensure it floats above all other elements
              maxHeight: '150px',
              overflowY: 'auto',
              border: '1px solid #ccc',
              backgroundColor: '#fff', // Ensure background covers other content
              borderRadius: '4px',
              boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', // Optional: Add a shadow for better visibility
            }}
          >
            {filteredSuggestions.map((suggestion, index) => (
              <IonItem key={index} button onClick={() => addTag(suggestion)}>
                <IonText>{suggestion}</IonText>
              </IonItem>
            ))}
          </IonList>
        )}
      </div>
    </div>
  );
};

export default NiceTags;
