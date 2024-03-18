import React, { useState } from "react"
import { NumberInput, Image, SimpleGrid, Modal, Button, Group, MantineProvider, ActionIcon, HoverCard, HoverCardTarget, HoverCardDropdown, Text, Container, Title } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import "@mantine/core/styles.css"
import { CiDumbbell } from "react-icons/ci"
import "./App.css"

const exercisesOptions = [
  { id: 1, name: "Barbell Bench Press", image: "/images/barbellbench.jpg" },
  { id: 2, name: "Squat", image: "https://placehold.co/150x150" },
  { id: 3, name: "Lunges", image: "https://placehold.co/150x150" },
  { id: 3, name: "Lunges", image: "https://placehold.co/150x150" },
  { id: 3, name: "Lunges", image: "https://placehold.co/150x150" },
  { id: 3, name: "Lunges", image: "https://placehold.co/150x150" },
  { id: 3, name: "Lunges", image: "https://placehold.co/150x150" },
  { id: 3, name: "Lunges", image: "https://placehold.co/150x150" },
  { id: 3, name: "Lunges", image: "https://placehold.co/150x150" },
  { id: 3, name: "Lunges", image: "https://placehold.co/150x150" },
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
    }
  }

  return (
    <MantineProvider>
      <Group className='header'>
        <h1>Exercises</h1>
      </Group>
      <Modal opened={opened} onClose={close} title='Add Exercise' centered>
        <SimpleGrid cols={1}>
          <div className='modal-content'>
            <div className='column'>
              <Title className='exec-name' order={2}>
                Select Exercise
              </Title>
              <div className='exec-values row'>
                {exercisesOptions.map((exercise) => (
                  <div key={exercise.id} className='exercise-option' onClick={() => setSelectedExercise(exercise)}>
                    <Image src={exercise.image} />
                    <p>{exercise.name}</p>
                  </div>
                ))}
              </div>
              <NumberInput value={weightValue} onChange={setWeightValue} radius='xl' label='Kilograms' />
              <NumberInput value={repValue} onChange={setRepValue} radius='xl' label='Repetition' />
              <Button className='add' onClick={addExercise}>
                Add
              </Button>
            </div>
          </div>
        </SimpleGrid>
      </Modal>

      <Group className='flex'>
        <Group className='exercises'>
          {exercises.map((exercise) => (
            <div key={exercise.id} className='exercise-content'>
              <Image src={exercise.image} />
              <Title className='exec-name' order={2}>
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
