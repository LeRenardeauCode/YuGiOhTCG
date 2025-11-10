// backend/scripts/hashPasswords.js
import bcrypt from 'bcryptjs';
import connexion from '../config/bdd.js';

const hashAllPasswords = async () => {
  const [users] = await connexion.query('SELECT UserId, MotDePasse FROM user');
  
  for (const user of users) {
    if (user.MotDePasse === 'temp123') {
      const hash = await bcrypt.hash('password123', 10);
      await connexion.query('UPDATE user SET MotDePasse = ? WHERE UserId = ?', [hash, user.UserId]);
      console.log(`✅ User ${user.UserId} hashé`);
    }
  }
  
  console.log('✅ Tous les mots de passe sont hashés !');
  process.exit(0);
};

hashAllPasswords();
