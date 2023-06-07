import DathckicModel from '../models/Dathckic.js';

export const infdatch = async (req, res) => {
    try {
      // Опрацювання та збереження даних в MongoDB
      const docDath = new DathckicModel({ 
        Dathckic: req.body.Dathckic,
      });
      
      const parkingSpaceData = {
        spaceId: 1,
        status: 'occupied',
      };
      const Dathckic = await docDath.save();
      
      // Виведення даних
      console.log('Received parking space data:', docDath);
  
      res.send('OK');
    } catch (err) {
      console.error('Error updating parking space:', err);
      res.status(500).send('Internal Server Error');
    }
  };