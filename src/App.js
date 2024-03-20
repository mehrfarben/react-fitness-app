import React, { useState } from "react"
import { NumberInput, Image, SimpleGrid, Modal, Button, Group, MantineProvider, ActionIcon, HoverCard, HoverCardTarget, HoverCardDropdown, Text, Title } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import "@mantine/core/styles.css"
import { CiDumbbell } from "react-icons/ci"
import "./App.css"

const exercisesOptions = [
  { id: 1, name: "Barbell Bench Press", image: "assets/images/benchpress.png" },
  { id: 2, name: "Barbell Curl", image: "assets/images/barbellcurl.png" },
  { id: 3, name: "Squat", image: "assets/images/barbellsquat.png" },
  { id: 4, name: "Dumbbell Bench Press", image: "assets/images/dumbbellpress.png" },
  { id: 5, name: "Lateral Raise", image: "assets/images/latraise.png" },
  { id: 6, name: "Preacher Curl", image: "assets/images/preachercurl.png" },
  { id: 7, name: "Triceps Pushdown", image: "assets/images/tricepspush.png" },
]

function App() {
  const [opened, { open, close }] = useDisclosure(false)
  const [exercises, setExercises] = useState([])
  const [selectedExercise, setSelectedExercise] = useState(null)
  const [repValue, setRepValue] = useState("")
  const [weightValue, setWeightValue] = useState("")

  const addExercise = () => {
    if (selectedExercise && repValue && weightValue) {
      const newExercise = {
        id: selectedExercise.id,
        name: selectedExercise.name,
        image: selectedExercise.image,
        reps: repValue,
        weight: weightValue,
      }
      setExercises([...exercises, newExercise])
      setSelectedExercise(null)
      setRepValue("")
      setWeightValue("")
      close()
    }
  }

  return (
    <MantineProvider>
      <Group className='header'>
        <h1>Exercises</h1>
      </Group>
      <Modal
        opened={opened}
        onClose={close}
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
        centered='true'>
        <div className='modal-content'>
          <div className='column'>
            <Title className='exercise-name' order={2}>
              Select Exercise
            </Title>
            <div className='exercise-options'>
              {exercisesOptions.map((exercise) => (
                <div key={exercise.id} className='exercise-option' onClick={() => setSelectedExercise(exercise)}>
                  <Image src={exercise.image} tabIndex={"0"} />
                  <p>{exercise.name}</p>
                </div>
              ))}
            </div>
            <div className='modal-values'>
              <NumberInput value={weightValue} onChange={setWeightValue} radius='xl' label='Kilograms' allowNegative='false' />
              <NumberInput value={repValue} onChange={setRepValue} radius='xl' label='Repetition' allowNegative='false' />
              <Button className='add' onClick={addExercise}>
                Add
              </Button>
            </div>
          </div>
        </div>
      </Modal>

      <Group className='flex'>
        <Group className='exercises-done'>
          {exercises.map((exercise) => (
            <div key={exercise.id} className='exercise-content'>
              <Image src={exercise.image} />
              <Title className='exercise-name' order={2}>
                {exercise.name}
              </Title>
              <p>
                Weight: {exercise.weight} Reps: {exercise.reps}
              </p>
            </div>
          ))}
        </Group>

        <Group>
          <HoverCard>
            <HoverCardTarget>
              <ActionIcon onClick={open} variant='filled' size='100' radius='100'>
                <CiDumbbell style={{ width: "70%", height: "70%" }} stroke={1.5} />
              </ActionIcon>
            </HoverCardTarget>
            <HoverCardDropdown>
              <Text size='xs'>Add Exercise</Text>
            </HoverCardDropdown>
          </HoverCard>
        </Group>
      </Group>
    </MantineProvider>
  )
}

export default App
