
import React from 'react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

const NoAvailabilityAlert = () => {
  return (
    <Alert variant="destructive" className="mb-6">
      <AlertTitle>Sorry! There is no room available!</AlertTitle>
      <AlertDescription>
        Unfortunately, there are no available rooms of the selected type on your chosen date. 
        Please select a different date or room type.
      </AlertDescription>
    </Alert>
  );
};

export default NoAvailabilityAlert;
