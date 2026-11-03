export const isAutomatticTeamMember = ( teams ) =>
	!! teams?.find( ( team ) => team.slug === 'a8c' );

// Single gate for the Conversations inbox. Launching it to everyone means returning true here,
// together with lifting the reader_conversations_endpoint / is_automattician gate on wpcom.
export const isConversationsInboxEnabled = ( teams ) => isAutomatticTeamMember( teams );
