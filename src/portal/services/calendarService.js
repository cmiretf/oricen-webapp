const CALENDAR_API = 'https://www.googleapis.com/calendar/v3'

export const calendarService = {
  async createEvent(accessToken, { summary, description, date, time, duration = 60, attendeeEmail, type }) {
    const startDateTime = `${date}T${time}:00`
    const endDate = new Date(`${date}T${time}:00`)
    endDate.setMinutes(endDate.getMinutes() + duration)
    const endDateTime = endDate.toISOString().replace('Z', '')

    const event = {
      summary: summary || 'Entrevista Oricen',
      description: description || 'Entrevista de orientación vocacional - Oricen',
      start: {
        dateTime: startDateTime,
        timeZone: 'Europe/Madrid'
      },
      end: {
        dateTime: endDateTime,
        timeZone: 'Europe/Madrid'
      },
      attendees: attendeeEmail ? [{ email: attendeeEmail }] : [],
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'email', minutes: 60 },
          { method: 'popup', minutes: 15 }
        ]
      }
    }

    if (type === 'video') {
      event.conferenceData = {
        createRequest: {
          requestId: `oricen-${Date.now()}`,
          conferenceSolutionKey: { type: 'hangoutsMeet' }
        }
      }
    }

    if (type === 'inperson') {
      event.location = 'Camino de Valdenigriales, s/n, 28223 Pozuelo de Alarcón, Madrid (ESIC University)'
    }

    const response = await fetch(
      `${CALENDAR_API}/calendars/primary/events?conferenceDataVersion=1&sendUpdates=all`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(event)
      }
    )

    if (!response.ok) {
      const err = await response.json().catch(() => ({}))
      throw new Error(err.error?.message || 'Error al crear evento en Google Calendar')
    }

    const data = await response.json()
    return {
      eventId: data.id,
      htmlLink: data.htmlLink,
      meetLink: data.conferenceData?.entryPoints?.find(e => e.entryPointType === 'video')?.uri || null
    }
  }
}
