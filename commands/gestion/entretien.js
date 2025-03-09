const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "entretien",
    description: "Envoie un MP pour un entretien et attribue le rôle.",
    async execute(message, args) {
        // Vérifie que l'utilisateur a bien mis 3 arguments
        if (args.length < 3) {
            return message.reply("Usage : `+entretien <date> <heure> <ID Discord>`");
        }

        const [date, heure, userId] = args;
        const guild = message.guild;
        const member = guild.members.cache.get(userId);

        // Vérifie si l'utilisateur existe sur le serveur
        if (!member) {
            return message.reply("Utilisateur introuvable sur le serveur !");
        }

        // Crée l'embed du message privé
        const embed = new EmbedBuilder()
            .setColor("#ff8c00")
            .setTitle("📢 - Entretien")
            .setDescription(
                `Hey, félicitations, tu as réussi à passer la première étape du recrutement chez **Puy du Rêve** ! 🎉\n\n` +
                `📅 **Date** : ${date}\n⏰ **Heure** : ${heure}\n👤 **Pseudo** : ${member.user.tag}\n\n` +
                `Je te laisse prendre conscience des informations ci-dessus.\n\nCordialement,`
            );

        // Envoie le MP à l’utilisateur
        try {
            await member.send({ embeds: [embed] });
            message.reply(`Le message a bien été envoyé à <@${userId}> ✅`);
        } catch (error) {
            message.reply("Impossible d'envoyer un MP à cet utilisateur. Vérifie ses paramètres !");
        }

        // Attribue le rôle "Entretien"
        const role = guild.roles.cache.find(r => r.name === "E • Entretien");
        if (role) {
            await member.roles.add(role);
            message.reply(`Le rôle **Entretien** a été attribué à <@${userId}> 🎭`);
        } else {
            message.reply("Le rôle **Entretien** n'existe pas sur le serveur !");
        }
    },
};
