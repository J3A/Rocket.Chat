import { IRoom } from '@rocket.chat/core-typings';
import { useMutableCallback } from '@rocket.chat/fuselage-hooks';
import { useTranslation } from '@rocket.chat/ui-contexts';
import {
	VideoConfPopup,
	VideoConfPopupContent,
	VideoConfPopupControllers,
	VideoConfController,
	useVideoConfControllers,
	VideoConfButton,
	VideoConfPopupFooter,
	VideoConfPopupTitle,
	VideoConfPopupFooterButtons,
	VideoConfPopupHeader,
} from '@rocket.chat/ui-video-conf';
import React, { ReactElement, forwardRef, Ref } from 'react';

import {
	useVideoConfSetPreferences,
	useVideoConfCapabilities,
	useVideoConfPreferences,
} from '../../../../../../../contexts/VideoConfContext';
import VideoConfPopupRoomInfo from '../VideoConfPopupRoomInfo';

type StartDirectCallPopup = {
	room: IRoom;
	onConfirm: () => void;
	loading: boolean;
};

const StartDirectCallPopup = forwardRef(function StartDirectCallPopup(
	{ room, onConfirm, loading }: StartDirectCallPopup,
	ref: Ref<HTMLDivElement>,
): ReactElement {
	const t = useTranslation();

	const videoConfPreferences = useVideoConfPreferences();
	const setPreferences = useVideoConfSetPreferences();
	const { controllersConfig, handleToggleMic, handleToggleCam } = useVideoConfControllers(videoConfPreferences);
	const capabilities = useVideoConfCapabilities();

	const showCam = !!capabilities.cam;
	const showMic = !!capabilities.mic;

	const handleStartCall = useMutableCallback(() => {
		setPreferences(controllersConfig);
		onConfirm();
	});

	return (
		<VideoConfPopup ref={ref}>
			<VideoConfPopupHeader>
				<VideoConfPopupTitle text={t('Start_a_call')} />
				{(showCam || showMic) && (
					<VideoConfPopupControllers>
						{showCam && (
							<VideoConfController
								active={controllersConfig.cam}
								title={controllersConfig.cam ? t('Cam_on') : t('Cam_off')}
								icon={controllersConfig.cam ? 'video' : 'video-off'}
								onClick={handleToggleCam}
							/>
						)}
						{showMic && (
							<VideoConfController
								active={controllersConfig.mic}
								title={controllersConfig.mic ? t('Mic_on') : t('Mic_off')}
								icon={controllersConfig.mic ? 'mic' : 'mic-off'}
								onClick={handleToggleMic}
							/>
						)}
					</VideoConfPopupControllers>
				)}
			</VideoConfPopupHeader>
			<VideoConfPopupContent>
				<VideoConfPopupRoomInfo room={room} />
			</VideoConfPopupContent>
			<VideoConfPopupFooter>
				<VideoConfPopupFooterButtons>
					<VideoConfButton disabled={loading} primary onClick={handleStartCall}>
						{t('Start_call')}
					</VideoConfButton>
				</VideoConfPopupFooterButtons>
			</VideoConfPopupFooter>
		</VideoConfPopup>
	);
});

export default StartDirectCallPopup;
