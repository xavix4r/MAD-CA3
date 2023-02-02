// Wong Wei Jun Daniel
// P2243564
// DIT/FT/1B/02

import { View, Text, StyleSheet, ScrollView, FlatList, Pressable, Alert, Image } from "react-native";
import React, { useState,useContext } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import AddButton from "./AddButton";
import Task from "./Task";
import TaskDayButton from "./TaskDayButton";
import { TaskContext } from "./Context";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";



export const HomeStackNavigator = () => {
  const [isTodaySelected, setTodaySelected] = React.useState(true);
  const [isTomorrowSelected, setTomorrowSelected] = React.useState(false);
  const [isUpcomingSelected, setUpcomingSelected] = React.useState(false);
  const [isCompletedSelected, setCompletedSelected] = React.useState(false);

  const {
    todayTask,
    setTodayTask,
    tomorrowTask,
    setTomorrowTask,
    upcomingTask,
    setUpcomingTask,
    completedTask,
    setCompletedTask,
  } = useContext(TaskContext);



  const todayPressed = () => {
    setTodaySelected(true);
    setTomorrowSelected(false);
    setUpcomingSelected(false);
    setCompletedSelected(false);
  };

  const tomorrowPressed = () => {
    setTodaySelected(false);
    setTomorrowSelected(true);
    setUpcomingSelected(false);
    setCompletedSelected(false);
  };

  const upcomingPressed = () => {
    setTodaySelected(false);
    setTomorrowSelected(false);
    setUpcomingSelected(true);
    setCompletedSelected(false);
  };

  const completedPressed = () => {
    setTodaySelected(false);
    setTomorrowSelected(false);
    setUpcomingSelected(false);
    setCompletedSelected(true);
  };

  const clearAllCompleted = () => {
    Alert.alert('Confirm', 'Clear Completed Tasks?', [
      {
        text: 'Yes',
        onPress: () => setCompletedTask([]),
      },
      {
        text: 'No',
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.greeting}>
        <Text style={styles.greetingTitle}>{"Hello There!"}</Text>
      </View>

      <View style={styles.tasksSection}>
        <View
          style={{
            ...StyleSheet.absoluteFillObject,
            backgroundColor: "#5C71E6",
          }}
        />
        <View style={{ flex: 1 }}>
          <View
            style={{
              flex: 1,
              backgroundColor: "white",
              borderTopLeftRadius: 40,
              borderTopRightRadius: 40,
              padding: 22,
            }}
          >
            <View style={styles.taskDayButtons}>
              <TaskDayButton
                pressableStyle={[
                  styles.button,
                  { backgroundColor: isTodaySelected ? "#5C71E6" : "white" },
                ]}
                textStyle={[
                  styles.dayTitle,
                  { color: isTodaySelected ? "white" : "#222B45" },
                ]}
                onPress={todayPressed}
                Text={"Today"}
              />
              <TaskDayButton
                pressableStyle={[
                  styles.button,
                  { backgroundColor: isTomorrowSelected ? "#5C71E6" : "white" },
                ]}
                textStyle={[
                  styles.dayTitle,
                  { color: isTomorrowSelected ? "white" : "#222B45" },
                ]}
                onPress={tomorrowPressed}
                Text={"Tomorrow"}
              />
              <TaskDayButton
                pressableStyle={[
                  styles.button,
                  { backgroundColor: isUpcomingSelected ? "#5C71E6" : "white" },
                ]}
                textStyle={[
                  styles.dayTitle,
                  { color: isUpcomingSelected ? "white" : "#222B45" },
                ]}
                onPress={upcomingPressed}
                Text={"Upcoming"}
              />
              <TaskDayButton
                pressableStyle={[
                  styles.button,
                  {
                    backgroundColor: isCompletedSelected ? "#5C71E6" : "white",
                  },
                ]}
                textStyle={[
                  styles.dayTitle,
                  { color: isCompletedSelected ? "white" : "#222B45" },
                ]}
                onPress={completedPressed}
                Text={"Completed"}
              />
            </View>

            {isTodaySelected === true && (
              todayTask.length > 0 ? (
                <FlatList
                  data={todayTask}
                  renderItem={({ item }) => (
                    <Task
                      todayTask={todayTask}
                      completedTask={completedTask}
                      setCompletedTask={setCompletedTask}
                      setTodayTask={setTodayTask}
                      isChecked={item.isCompleted}
                      id={item.id}
                      text={item.taskName}
                      datetext={item.date}
                      description={item.taskDescription}
                    />
                  )}
                  keyExtractor={(item) => item.id}
                />
              ) : (
                <View style={styles.emptyTask}>
                  <Image
                    style={{ width: 64, height: 64 }}
                    source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2171/2171990.png' }}
                  />
                  <Text style={styles.emptyTaskText}>Wow Much Empty!</Text>
                </View>
              )
            )}

            {isTomorrowSelected === true && (
              tomorrowTask.length > 0 ? (
              <FlatList
                data={tomorrowTask}
                renderItem={({ item }) => (
                  <Task
                    tomorrowTask={tomorrowTask}
                    completedTask={completedTask}
                    setTomorrowTask={setTomorrowTask}
                    setCompletedTask={setCompletedTask}
                    isChecked={item.isCompleted}
                    id={item.id}
                    text={item.taskName}
                    datetext={item.date}
                    description={item.taskDescription}
                  />
                )}
                keyExtractor={(item) => item.id}
                
              />
              ) : (
                <View style={styles.emptyTask}>
                  <Image
                    style={{ width: 64, height: 64 }}
                    source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2171/2171990.png' }}
                  />
                  <Text style={styles.emptyTaskText}>Wow Much Empty!</Text>
                </View>
              )
            )}

            {isUpcomingSelected === true && (
               upcomingTask.length > 0 ? (
              <FlatList
                data={upcomingTask}
                renderItem={({ item }) => (
                  <Task
                    upcomingTask={upcomingTask}
                    setUpcomingTask={setUpcomingTask}
                    completedTask={completedTask}
                    setCompletedTask={setCompletedTask}
                    isChecked={item.isCompleted}
                    id={item.id}
                    text={item.taskName}
                    datetext={item.date}
                    description={item.taskDescription}
                  />
                )}
                keyExtractor={(item) => item.id}
              />
               ) : (
                <View style={styles.emptyTask}>
                  <Image
                    style={{ width: 64, height: 64 }}
                    source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2171/2171990.png' }}
                  />
                  <Text style={styles.emptyTaskText}>Wow Much Empty!</Text>
                </View>
              )
            )}

            {isCompletedSelected === true && (
              completedTask.length > 0 ? (
              <View>

                <FlatList
                  data={completedTask}
                  renderItem={({ item }) => (
                    <Task
                      completed={completedTask}
                      setCompletedTask={setCompletedTask}
                      todayTask={todayTask}
                      completedTask={completedTask}
                      tomorrowTask={tomorrowTask}
                      upcomingTask={upcomingTask}
                      setUpcomingTask={setUpcomingTask}
                      isChecked={item.isCompleted}
                      id={item.id}
                      text={item.taskName}
                      datetext={item.date}
                      description={item.taskDescription}
                    />
                  )}
                  keyExtractor={(item) => item.id}
                /> 
                <Pressable
                  style={({ pressed }) => [
                    {
                      backgroundColor: pressed ? "#5C82B8" : "#6E9CDB",
                    },
                    styles.deletebutton,
                  ]}
                  onPress={clearAllCompleted}

                >
                  <MaterialCommunityIcons name="delete-empty" color={"#F8F8F8"} size={25} />
                </Pressable>
                
              </View>
              ) : (
                <View style={styles.emptyTask}>
                  <Image
                    style={{ width: 64, height: 64 }}
                    source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2171/2171990.png' }}
                  />
                  <Text style={styles.emptyTaskText}>Wow Much Empty!</Text>
                </View>
              )
            )}
          </View>
        </View>
      </View>

      <AddButton
        todayTask={todayTask}
        setTodayTask={setTodayTask}
        tomorrowTask={tomorrowTask}
        setTomorrowTask={setTomorrowTask}
        upcomingTask={upcomingTask}
        setUpcomingTask={setUpcomingTask}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },

  greeting: {
    height: hp("24%"),
    backgroundColor: "#5C71E6",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 20,
  },

  greetingTitle: {
    fontSize: 35,
    fontFamily: "sans-serif",
    color: "white",
  },

  tasksSection: {
    flex: 1,
  },

  todayTaskTitle: {
    color: "#222B45",
    fontFamily: "sans-serif-light",
    fontSize: 30,
  },

  taskDayButtons: {
    flexDirection: "row",
    justifyContent: "space-around",

    marginTop: 20,
  },

  button: {
    width: "auto",
    height: 30,

    borderWidth: 1.1,
    borderRadius: 20,
    borderColor: "#5C71E6",

    paddingHorizontal: 12,
    justifyContent: "center",
    alignItems: "center",
  },

  deletebutton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#e63946',
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 340,
    left: 295,
    elevation: 7,
  },

  dayTitle: {
    color: "#222B45",
  },

  emptyTask: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  emptyTaskText: {
    textAlign: "center", 
    fontSize: 20, 
    color: '#AAAAAA', 
    marginTop: 10
  }
});
