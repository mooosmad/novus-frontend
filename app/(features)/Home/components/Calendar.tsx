"use client"

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import AppointmentModal from './AppointmentModal'

interface AppointmentData {
  doctor: string
  appointmentNumber: string
  startTime: string
  duration: string
  endTime: string
  description: string
  reason: string
  smsMessage: string
}

interface CalendarEvent {
  id: string
  doctor: string
  appointmentNumber: string
  startTime: string
  duration: string
  endTime: string
  description: string
  reason: string
  date: Date
  timeSlot: string
}

interface CalendarProps {
  className?: string
}

export default function Calendar({ className = "" }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false)
  const [viewMode, setViewMode] = useState<'day' | 'week' | 'month' | 'doctor'>('doctor')
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('')
  const [events, setEvents] = useState<CalendarEvent[]>([])

  const doctors = [
    'DOCTOR1',
    'DOCTOR2', 
    'DOCTOR3',
    'DOCTOR4',
    'DOCTOR5',
    'DOCTOR6',
    'DOCTOR7',
    'DOCTOR8',
    'DOCTOR9',
    'DOCTOR10'
  ]

  const timeSlots = Array.from({ length: 11 }, (_, i) => `${i + 8}`.padStart(2, '0'))

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDay = firstDay.getDay()
    
    const days = []
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDay; i++) {
      days.push(null)
    }
    
    // Add all days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i))
    }
    
    return days
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(date)
  }

  const isToday = (date: Date | null) => {
    if (!date) return false
    const today = new Date()
    return date.toDateString() === today.toDateString()
  }

  const isSelected = (date: Date | null) => {
    if (!date) return false
    return selectedDate?.toDateString() === date.toDateString()
  }

  const getEventsForDate = (date: Date) => {
    return events.filter(event => 
      event.date.toDateString() === date.toDateString()
    )
  }

  const getEventsForDoctorAndTime = (doctor: string, timeSlot: string) => {
    return events.filter(event => 
      event.doctor === doctor && event.timeSlot === timeSlot
    )
  }

  const handleDateClick = (date: Date) => {
    setSelectedDate(date)
    setIsAppointmentModalOpen(true)
  }

  const handleTimeSlotClick = (timeSlot: string) => {
    setSelectedTimeSlot(timeSlot)
    setIsAppointmentModalOpen(true)
  }

  const handleAppointmentSubmit = (appointmentData: AppointmentData) => {
    const newEvent: CalendarEvent = {
      id: Date.now().toString(),
      doctor: appointmentData.doctor,
      appointmentNumber: appointmentData.appointmentNumber,
      startTime: appointmentData.startTime,
      duration: appointmentData.duration,
      endTime: appointmentData.endTime,
      description: appointmentData.description,
      reason: appointmentData.reason,
      date: selectedDate || new Date(),
      timeSlot: selectedTimeSlot || '08'
    }
    
    setEvents(prev => [...prev, newEvent])
    setIsAppointmentModalOpen(false)
    setSelectedDate(null)
    setSelectedTimeSlot('')
  }

  const goToToday = () => {
    setCurrentDate(new Date())
    setSelectedDate(null)
  }

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
  }

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
  }

  const renderMonthView = () => {
    const days = getDaysInMonth(currentDate)
    const weekDays = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam']

    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        {/* Calendar Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <button
              onClick={goToPreviousMonth}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <button
              onClick={goToToday}
              className="px-4 py-2 text-sm font-medium text-blue hover:bg-blue-50 rounded-lg transition-colors"
            >
              Aujourd&apos;hui
            </button>
            <button
              onClick={goToNextMonth}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>
          
          <h2 className="text-xl font-semibold text-gray-900">
            {formatDate(currentDate)}
          </h2>
        </div>

        {/* Calendar Grid */}
        <div className="p-6">
          {/* Week days header */}
          <div className="grid grid-cols-7 gap-1 mb-4">
            {weekDays.map((day) => (
              <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar days */}
          <div className="grid grid-cols-7 gap-1">
            {days.map((day, index) => {
              const dayEvents = day ? getEventsForDate(day) : []
              
              return (
                <motion.button
                  key={index}
                  onClick={() => day && handleDateClick(day)}
                  disabled={!day}
                  className={`
                    aspect-square p-2 rounded-lg text-sm font-medium transition-all duration-200 relative
                    ${!day ? 'invisible' : ''}
                    ${isToday(day) ? 'bg-blue-100 text-blue' : ''}
                    ${isSelected(day) ? 'bg-blue text-white' : ''}
                    ${day && !isToday(day) && !isSelected(day) ? 'hover:bg-gray-100 text-gray-700' : ''}
                  `}
                  whileHover={day ? { scale: 1.05 } : {}}
                  whileTap={day ? { scale: 0.95 } : {}}
                >
                  <div className="flex flex-col h-full">
                    <span className="text-center">{day?.getDate()}</span>
                    
                    {/* Event indicators */}
                    {dayEvents.length > 0 && (
                      <div className="flex flex-col gap-1 mt-1">
                        {dayEvents.slice(0, 2).map((event) => (
                          <div
                            key={event.id}
                            className="w-full h-1 bg-green-500 rounded-full"
                            title={`${event.doctor} - ${event.description}`}
                          />
                        ))}
                        {dayEvents.length > 2 && (
                          <div className="w-full h-1 bg-gray-400 rounded-full" />
                        )}
                      </div>
                    )}
                  </div>
                </motion.button>
              )
            })}
          </div>
        </div>
      </div>
    )
  }

  const renderDoctorView = () => {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <button
              onClick={goToPreviousMonth}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <button
              onClick={goToToday}
              className="px-4 py-2 text-sm font-medium text-blue hover:bg-blue-50 rounded-lg transition-colors"
            >
              Aujourd&apos;hui
            </button>
            <button
              onClick={goToNextMonth}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>
          
          <h2 className="text-xl font-semibold text-gray-900">
            {formatDate(currentDate)}
          </h2>

          <div className="flex gap-2">
            {[
              { key: 'doctor', label: 'Par medecin' },
              { key: 'day', label: 'Jour' },
              { key: 'week', label: 'Semaine' },
              { key: 'month', label: 'Mois' }
            ].map((view) => (
              <button
                key={view.key}
                onClick={() => setViewMode(view.key as 'day' | 'week' | 'month' | 'doctor')}
                className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                  viewMode === view.key
                    ? 'bg-blue text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {view.label}
              </button>
            ))}
          </div>
        </div>

        {/* Schedule Grid */}
        <div className="flex">
          {/* Doctors List */}
          <div className="w-48 border-r border-gray-100">
            <div className="p-4 bg-gray-50 border-b border-gray-100">
              <h3 className="font-medium text-gray-900">Médecins</h3>
            </div>
            <div className="divide-y divide-gray-100">
              {doctors.map((doctor) => (
                <div
                  key={doctor}
                  className="p-4 h-16 flex items-center justify-center text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  {doctor}
                </div>
              ))}
            </div>
          </div>

          {/* Time Grid */}
          <div className="flex-1">
            {/* Time Header */}
            <div className="flex border-b border-gray-100">
              {timeSlots.map((time) => (
                <div
                  key={time}
                  className="flex-1 p-4 text-center text-sm font-medium text-gray-700 border-r border-gray-100 last:border-r-0"
                >
                  {time}
                </div>
              ))}
            </div>

            {/* Schedule Grid */}
            <div className="divide-y divide-gray-100">
              {doctors.map((doctor) => (
                <div key={doctor} className="flex h-16">
                  {timeSlots.map((time) => {
                    const slotEvents = getEventsForDoctorAndTime(doctor, time)
                    
                    return (
                      <motion.div
                        key={`${doctor}-${time}`}
                        onClick={() => handleTimeSlotClick(time)}
                        className="flex-1 border-r border-gray-100 last:border-r-0 hover:bg-blue-50 transition-colors cursor-pointer relative group"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="absolute inset-0 flex items-center justify-center">
                          {slotEvents.length > 0 ? (
                            <div className="w-full h-full bg-green-100 border border-green-300 rounded flex items-center justify-center">
                              <div className="text-xs text-green-700 font-medium">
                                RDV
                              </div>
                            </div>
                          ) : (
                            <div className="w-1 h-1 bg-gray-300 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                          )}
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={className}>
      <AnimatePresence mode="wait">
        {viewMode === 'doctor' ? (
          <motion.div
            key="doctor-view"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderDoctorView()}
          </motion.div>
        ) : (
          <motion.div
            key="month-view"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderMonthView()}
          </motion.div>
        )}
      </AnimatePresence>

      <AppointmentModal
        isOpen={isAppointmentModalOpen}
        onClose={() => setIsAppointmentModalOpen(false)}
        selectedDate={selectedDate}
        selectedTimeSlot={selectedTimeSlot}
        onSubmit={handleAppointmentSubmit}
      />
    </div>
  )
} 