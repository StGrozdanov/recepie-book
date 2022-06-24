import { FlatList, RefreshControl } from "react-native";
import { userStyles } from "../Users/UserStyleSheet";
import Table from "../Table/Table";
import { summary } from "../../helpers/contentSummary";
import { useCallback, useState } from "react";
import { useDataParamSort } from '../../hooks/useDataParamSort';
import { useRoute } from "@react-navigation/native";

const DATA = [
    { id: 1, content: 'ако е онова на Шушата е ТОП!', Owner: 2, Location: 'HRKqZ1IqRG', imgUrl: '' },
    { id: 2, content: 'Всеки път става различна!ха ха ха', Owner: 2, Location: 'redirect', imgUrl: '' },
    { id: 3, content: 'Баш неговото ще е! ТОП-ТОП!', Owner: 3, Location: 'redirect', imgUrl: '' },
    { id: 4, content: 'The recipe is cool', Owner: 4, Location: 'redirect', imgUrl: '' },
    { id: 5, content: '😋😍🥰', Owner: 2, Location: 'redirect', imgUrl: '' },
    { id: 6, content: 'Хехе, много ясно!', Owner: 1, Location: 'redirect', imgUrl: '' },
    { id: 7, content: 'Защото снощи правих кееекс!', Owner: 1, Location: 'redirect', imgUrl: '' },
    { id: 8, content: 'Баси яката рецепта! Браво !', Owner: 1, Location: 'redirect', imgUrl: '' },
    { id: 9, content: 'Много готина мусака', Owner: 1, Location: 'redirect', imgUrl: '' },
    { id: 10, content: 'На 25/3/22 с Патюшка си направихме и ….следва продължение!', Owner: 2, Location: 'redirect', imgUrl: '' },
    { id: 11, content: '… E,беше ФАМОЗНО!!! 🥰😍😚🤩😃😋', Owner: 2, Location: 'redirect', imgUrl: '' },
];

export default function Comments() {
    const [refreshData, setRefreshData] = useState(false);
    const route = useRoute();
    const sortedData = useDataParamSort(DATA, route.params.itemId);

    const onRefresh = useCallback(() => {
        setRefreshData(true);
        setTimeout(() => {
            setRefreshData(false)
        }, 2000)
    }, []);

    return (
        <FlatList
            refreshControl={<RefreshControl refreshing={refreshData} onRefresh={onRefresh} />}
            style={userStyles.container}
            keyExtractor={item => item.id}
            data={sortedData}
            renderItem={({ item }) => (
                <Table
                    name={summary(item.content)}
                    pictureType={'avatar'}
                    pictureSource={item.imgUrl}
                    data={item}
                    isEven={item.id % 2 === 0}
                    isFirst={sortedData[0].id === item.id}
                    isLast={sortedData[sortedData.length - 1].id === item.id}
                    blockAction={'user'}
                    removeAction={'comment'}
                />
            )}
        />
    );
}