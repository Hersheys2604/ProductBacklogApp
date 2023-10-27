import React, { useEffect, useState } from "react";
import CreatableSelect from "react-select/creatable";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";



export default function TagAssign({ passSelectedTags } = props) {
  const [tagsList, setTagsList] = useState([]); //List of tags to display
  const [selectedTags, setSelectedTag] = useState([]); //tags selected to be assigned to task
  // const [isHovering, setIsHovering] = useState(false); for hovering maybe use later
  
  const removeTag = async (tagToRemove, label) => {
    const body = {
      tagId: parseInt(tagToRemove),
    };
    await fetch(`/api/deleteTag`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
    setSelectedTag(selectedTags.filter((tag) => tag.value !== label)); // Update the state of the component
  }
// label is printing the name of tag want to pass ID of tag to delete
  const CustomOption = ({ innerProps, label, removeTag , value}) => {
    return (
      <div {...innerProps}>
        <span>{label}</span>
        <Button variant = "danger" size="sm" onClick={() => removeTag(value, label)}>x</Button>
      </div>
    );
  };


  //grabs tags from backend and saves in tagsList
  const fetchTagsInfo = async () => {
    const retrievedTags = await fetch(`/api/getTag`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        return response.json();
      })
      .then((data) => {
        var _ = data.reduce(function (object, value) {
          object[value.id] = { value: value.id, label: value.name };
          return object;
        }, {});

        //cnover into arr of objects
        var res = Object.keys(_).map((key) => {
          return _[key];
        });

        return res;
      })
      .catch((error) => {
        console.error(`Could not get products: ${error}`);
      });
    setTagsList(retrievedTags);
  };

  fetchTagsInfo();

  useEffect(() => {
    console.log("state", selectedTags);
    passSelectedTags(selectedTags);
  }, [selectedTags]);

  //create new tag
  const createNewTag = async (newTagName) => {
    const body = {
      name: newTagName,
    };

    const createdTag = await fetch(`/api/makeTag`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to create data");
        }
        return response.json();
      })
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.error(`Could not get products: ${error}`);
      });

    const newOption = { value: createdTag.id, label: createdTag.name };
    setTagsList((prev) => [...prev, newOption]); //update list
  };


  return (
    <>
      <InputGroup>
        <InputGroup.Text id="addTaskName">Tags</InputGroup.Text>
        <CreatableSelect
          isMulti
          onChange={(value) => {
            setSelectedTag(value);
          }}
          onCreateOption={createNewTag}
          options={tagsList}
          value={selectedTags}
          aria-label={"Insert Tags"}
          components={{
            Option: (props) => (
              <CustomOption {...props} removeTag={removeTag} />
            ),
          }}
        />
      </InputGroup>
    </>
  );
}
