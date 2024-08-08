import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, addMonths, subMonths } from 'date-fns'; // Import necessary date functions
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Calendar = ({ onSelectDate }) => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);

    const handleDateClick = (date) => {
        setSelectedDate(date);
        onSelectDate(date);
    };

    const goToPreviousMonth = () => {
        setCurrentMonth(subMonths(currentMonth, 1));
    };

    const goToNextMonth = () => {
        setCurrentMonth(addMonths(currentMonth, 1));
    };

    const renderCalendar = () => {
        const startOfMonthDate = startOfMonth(currentMonth);
        const endOfMonthDate = endOfMonth(currentMonth);
        const days = eachDayOfInterval({ start: startOfMonthDate, end: endOfMonthDate });

        return (
            <View style={styles.calendar}>
                {days.map((date) => (
                    <TouchableOpacity
                        key={date.toISOString()}
                        style={[
                            styles.calendarDay,
                            isSameDay(date, selectedDate) && styles.selected,
                        ]}
                        onPress={() => handleDateClick(date)}
                    >
                        <Text style={styles.calendarDayText}>{format(date, 'd')}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        );
    };

    return (
        <View style={styles.calendarContainer}>
            <View style={styles.calendarHeader}>
                <TouchableOpacity onPress={goToPreviousMonth} style={styles.scrollButton}>
                    <FontAwesome name='arrow-left' size={36} color="blue" />
                </TouchableOpacity>
                <Text style={styles.calendarTitle}>
                    {format(currentMonth, 'MMMM yyyy')}
                </Text>
                <TouchableOpacity onPress={goToNextMonth} style={styles.scrollButton}>
                    <FontAwesome name='arrow-right' size={36} color="blue" />
                </TouchableOpacity>
            </View>
            {renderCalendar()}
        </View>
    );
};

const styles = StyleSheet.create({
    calendarContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        marginTop: 50,
    },
    calendarHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
        width: '100%',
        paddingHorizontal: 20,
    },
    calendar: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginTop: 10,
    },
    calendarDay: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5,
        borderRadius: 20,
        backgroundColor: '#f0f0f0',
    },
    calendarDayText: {
        fontSize: 16,
    },
    selected: {
        backgroundColor: '#4CAF50', // Example color for selected date
    },
    calendarTitle: {
        fontSize: 18,
    },
    scrollButton: {
        padding: 10,
    },
});

export default Calendar;
